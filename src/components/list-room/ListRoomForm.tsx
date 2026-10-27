'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HumanCheck from '@/components/HumanCheck'
import { executeCaptcha } from '@/lib/captchaClient'
import { amenityOptions, genderPolicies, roomTypes } from '@/lib/schemas'
import { formatKes } from '@/lib/site'

const COUNTIES = [
  'Nairobi',
  'Kajiado',
  'Kiambu',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Uasin Gishu',
  'Machakos',
  'Meru',
  'Nyeri',
]

const STEP_LABELS = ['Location', 'Room details', 'Pricing', 'Photos and rules']

export default function ListRoomForm() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [needsHuman, setNeedsHuman] = useState(false)
  const [v2Token, setV2Token] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Step 1
  const [county, setCounty] = useState('Nairobi')
  const [area, setArea] = useState('')
  const [landmark, setLandmark] = useState('')
  // Step 2
  const [type, setType] = useState<(typeof roomTypes)[number]>('Bedsitter')
  const [furnished, setFurnished] = useState(false)
  const [amenities, setAmenities] = useState<string[]>(['Water'])
  const [genderPolicy, setGenderPolicy] = useState<(typeof genderPolicies)[number]>('Any')
  // Step 3
  const [weeklyKes, setWeeklyKes] = useState('')
  const [monthlyKes, setMonthlyKes] = useState('')
  const [depositKes, setDepositKes] = useState('')
  const [depositCovers, setDepositCovers] = useState('')
  // Step 4
  const [photos, setPhotos] = useState<File[]>([])
  const [rules, setRules] = useState('')
  const [availability, setAvailability] = useState('')
  const [description, setDescription] = useState('')

  const progress = useMemo(() => (step / STEP_LABELS.length) * 100, [step])

  const toggleAmenity = (value: string) =>
    setAmenities((list) =>
      list.includes(value) ? list.filter((a) => a !== value) : [...list, value],
    )

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 8)
    setPhotos(files)
  }

  const validateStep = (): string => {
    if (step === 1) {
      if (!county || area.trim().length < 2) return 'Please enter the area and a nearby landmark.'
      if (landmark.trim().length < 2) return 'Please add a nearby landmark so seekers can find the room.'
    }
    if (step === 3) {
      if (!weeklyKes || Number(weeklyKes) < 200) return 'Please enter a realistic weekly price in KES.'
      if (!depositKes || Number(depositKes) < 0) return 'Please enter the deposit amount.'
      if (depositCovers.trim().length < 4) return 'Please explain what the deposit covers.'
    }
    if (step === 4) {
      if (photos.length === 0) return 'Please add at least one photo of the room.'
      if (rules.trim().length < 4) return 'Please write the house rules in plain language.'
      if (availability.trim().length < 2) return 'Please add an availability note.'
      if (description.trim().length < 10) return 'Please describe the room honestly.'
    }
    return ''
  }

  const next = () => {
    const problem = validateStep()
    if (problem) {
      setError(problem)
      return
    }
    setError('')
    setStep((s) => Math.min(STEP_LABELS.length, s + 1))
  }

  const back = () => {
    setError('')
    setStep((s) => Math.max(1, s - 1))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const problem = validateStep()
    if (problem) {
      setError(problem)
      return
    }
    setSubmitting(true)
    setError('')

    try {
      const token = needsHuman ? v2Token : await executeCaptcha('list-room')
      const form = new FormData()
      form.set('title', `${type} in ${area}`)
      form.set('county', county)
      form.set('area', area)
      form.set('landmark', landmark)
      form.set('type', type)
      form.set('furnished', String(furnished))
      form.set('amenities', JSON.stringify(amenities))
      form.set('genderPolicy', genderPolicy)
      form.set('weeklyKes', weeklyKes)
      form.set('monthlyKes', monthlyKes || '')
      form.set('depositKes', depositKes)
      form.set('depositCovers', depositCovers)
      form.set('rules', rules)
      form.set('availability', availability)
      form.set('description', description)
      form.set('captchaToken', token)
      form.set('v2Token', needsHuman ? v2Token : '')
      photos.forEach((file) => form.append('photos', file))

      const res = await fetch('/api/rooms/create', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) {
        if (data?.requiresV2) {
          setNeedsHuman(true)
          setSubmitting(false)
          setError('Please confirm you are human, then submit again.')
          return
        }
        throw new Error(data?.error || 'Could not save the listing. Please try again.')
      }
      setDone(true)
    } catch (err) {
      setSubmitting(false)
      setError(err instanceof Error ? err.message : 'Could not save the listing. Please try again.')
    }
  }

  if (done) {
    return (
      <div className="rounded-card border-2 border-primary/40 bg-light p-8 text-center">
        <h2 className="text-2xl text-black/80">Listing received</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 sm:text-base">
          Thank you. We sent a confirmation email and our team will review the listing before it
          appears in search. Keep photos honest and prices accurate so seekers can trust you.
        </p>
        <a href="/dashboard/listings" className="btn btn-primary mt-6">
          Go to my listings
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={submit}>
      {/* Progress bar, plain */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-light">
        <div
          className="progress-bar-fill h-full rounded-full bg-primary"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={STEP_LABELS.length}
          aria-label={`Step ${step} of ${STEP_LABELS.length}: ${STEP_LABELS[step - 1]}`}
        />
      </div>
      <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {STEP_LABELS.map((label, i) => (
          <li key={label} className={i + 1 === step ? 'font-medium text-primary' : ''}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-card border border-black/10 bg-white p-5 shadow-card sm:p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl text-black/80">Location</h2>
            <p className="mt-1 text-sm text-gray-600">
              Where is the room? Seekers search by county, area, and landmarks.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lr-county" className="block text-sm font-medium text-black/80">
                  County (required)
                </label>
                <select
                  id="lr-county"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="form-control mt-2"
                >
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lr-area" className="block text-sm font-medium text-black/80">
                  Area or estate (required)
                </label>
                <input
                  id="lr-area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. South B"
                  className="form-control mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="lr-landmark" className="block text-sm font-medium text-black/80">
                  Nearby landmark (required)
                </label>
                <input
                  id="lr-landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. 10 minutes from the stage"
                  className="form-control mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl text-black/80">Room details</h2>
            <p className="mt-1 text-sm text-gray-600">
              Describe the room type and what a tenant can expect.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lr-type" className="block text-sm font-medium text-black/80">
                  Room type (required)
                </label>
                <select
                  id="lr-type"
                  value={type}
                  onChange={(e) => setType(e.target.value as (typeof roomTypes)[number])}
                  className="form-control mt-2"
                >
                  {roomTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lr-gender" className="block text-sm font-medium text-black/80">
                  Gender policy (required)
                </label>
                <select
                  id="lr-gender"
                  value={genderPolicy}
                  onChange={(e) => setGenderPolicy(e.target.value as (typeof genderPolicies)[number])}
                  className="form-control mt-2"
                >
                  {genderPolicies.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={furnished}
                    onChange={(e) => setFurnished(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-gray-600">Room comes furnished</span>
                </label>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-medium text-black/80">Amenities</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {amenityOptions.map((a) => (
                    <label key={a} className="flex min-h-[44px] cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={amenities.includes(a)}
                        onChange={() => toggleAmenity(a)}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="text-sm text-gray-600">{a}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl text-black/80">Pricing</h2>
            <p className="mt-1 text-sm text-gray-600">
              All prices in Kenyan shillings. Clear prices build trust and get faster replies.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lr-weekly" className="block text-sm font-medium text-black/80">
                  Weekly price, KES (required)
                </label>
                <input
                  id="lr-weekly"
                  type="number"
                  inputMode="numeric"
                  min={200}
                  value={weeklyKes}
                  onChange={(e) => setWeeklyKes(e.target.value)}
                  className="form-control mt-2"
                />
              </div>
              <div>
                <label htmlFor="lr-monthly" className="block text-sm font-medium text-black/80">
                  Monthly price, KES (optional)
                </label>
                <input
                  id="lr-monthly"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={monthlyKes}
                  onChange={(e) => setMonthlyKes(e.target.value)}
                  className="form-control mt-2"
                />
              </div>
              <div>
                <label htmlFor="lr-deposit" className="block text-sm font-medium text-black/80">
                  Deposit, KES (required)
                </label>
                <input
                  id="lr-deposit"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={depositKes}
                  onChange={(e) => setDepositKes(e.target.value)}
                  className="form-control mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="lr-deposit-covers" className="block text-sm font-medium text-black/80">
                  What does the deposit cover? (required)
                </label>
                <textarea
                  id="lr-deposit-covers"
                  rows={3}
                  value={depositCovers}
                  onChange={(e) => setDepositCovers(e.target.value)}
                  placeholder="e.g. One month deposit, refunded when you move out without damage."
                  className="form-control mt-2"
                />
              </div>
            </div>
            {weeklyKes ? (
              <p className="mt-4 text-sm text-gray-600">
                Preview: {formatKes(Number(weeklyKes))} per week
                {monthlyKes ? ` or ${formatKes(Number(monthlyKes))} per month` : ''}.
              </p>
            ) : null}
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl text-black/80">Photos and rules</h2>
            <p className="mt-1 text-sm text-gray-600">
              Add up to 8 photos of the real room, then write the house rules and a short
              description. Review everything before you submit.
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="lr-photos" className="block text-sm font-medium text-black/80">
                  Photos (up to 8, at least 1 required)
                </label>
                <input
                  id="lr-photos"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFiles}
                  className="form-control mt-2 file:mr-4 file:rounded-btn file:border-0 file:bg-light file:px-4 file:py-2 file:text-sm file:text-black/70"
                />
                {photos.length > 0 ? (
                  <p className="mt-2 text-sm text-gray-600">
                    {photos.length} photo{photos.length === 1 ? '' : 's'} selected: {photos.map((p) => p.name).join(', ')}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="lr-availability" className="block text-sm font-medium text-black/80">
                  Availability note (required)
                </label>
                <input
                  id="lr-availability"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="e.g. Available from 1 November"
                  className="form-control mt-2"
                />
              </div>
              <div>
                <label htmlFor="lr-rules" className="block text-sm font-medium text-black/80">
                  House rules (required)
                </label>
                <textarea
                  id="lr-rules"
                  rows={3}
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  placeholder="e.g. No loud music after 10pm. Visitors until 8pm."
                  className="form-control mt-2"
                />
              </div>
              <div>
                <label htmlFor="lr-description" className="block text-sm font-medium text-black/80">
                  Short description (required)
                </label>
                <textarea
                  id="lr-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the room honestly: light, water, power, and who else lives there."
                  className="form-control mt-2"
                />
              </div>

              <div className="rounded-card border border-black/10 bg-light p-5">
                <h3 className="text-lg text-black/80">Review</h3>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li>Location: {area || '(area)'}{area && landmark ? `, ${landmark}` : ''}, {county}</li>
                  <li>Room: {type}, {furnished ? 'furnished' : 'unfurnished'}, {genderPolicy}</li>
                  <li>Amenities: {amenities.length > 0 ? amenities.join(', ') : 'none listed'}</li>
                  <li>
                    Price: {weeklyKes ? formatKes(Number(weeklyKes)) : '(weekly)'} per week
                    {monthlyKes ? ` or ${formatKes(Number(monthlyKes))} per month` : ''}
                    {depositKes ? `, deposit ${formatKes(Number(depositKes))}` : ''}
                  </li>
                  <li>Photos: {photos.length}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {needsHuman && <HumanCheck onVerify={(token) => setV2Token(token)} />}

        {error ? (
          <p className="mt-5 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="btn btn-outline-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Back
          </button>
          {step < STEP_LABELS.length ? (
            <button type="button" onClick={next} className="btn btn-primary w-full sm:w-auto">
              Next: {STEP_LABELS[step]}
            </button>
          ) : (
            <motion.button
              type="submit"
              disabled={submitting || (needsHuman && !v2Token)}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? 'Submitting…' : 'Submit listing'}
            </motion.button>
          )}
        </div>
      </div>
    </form>
  )
}
