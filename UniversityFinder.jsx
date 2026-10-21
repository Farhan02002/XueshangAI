
import { useState } from 'react';
import './UniversityFinder.css';

const subjects = [
  'Computer Science & Engineering',
  'Mechanical Engineering',
  'Electrical & Electronic Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Software Engineering',
  'Robotics Engineering',
  'Mechatronics Engineering',
  'Biomedical Engineering',
  'Data Science',
  'Artificial Intelligence',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Business Administration',
  'Economics',
  'Architecture',
];

const countries = [
'Bangladesh',
'India',
'United States',
'United Kingdom',
'Canada',
'Australia',
'Germany',
'Japan',
'South Korea',
'China',
'Singapore',
'Netherlands',
'Sweden',
'Switzerland',
'France',
'Italy',
'Finland',
'Malaysia',
'Pakistan',
'Sri Lanka',
'Nepal',
'Bhutan',
'Maldives',
'Afghanistan',
'Saudi Arabia',
'United Arab Emirates',
'Qatar',
'Kuwait',
'Oman',
'Bahrain',
'Turkey',
'Iran',
'Iraq',
'Egypt',
'South Africa',
'Nigeria',
'Kenya',
'Morocco',
'Ghana',
'Ethiopia',
'Tanzania',
'Uganda',
'Algeria',
'Brazil',
'Argentina',
'Chile',
'Colombia',
'Peru',
'Venezuela',
'Uruguay',
'Mexico',
'Cuba',
'Jamaica',
'New Zealand',
'Fiji',
'Spain',
'Portugal',
'Belgium',
'Austria',
'Norway',
'Denmark',
'Poland',
'Czech Republic',
'Hungary',
'Greece',
'Russia',
'Ukraine',
'Romania',
'Ireland',
'Indonesia',
'Thailand',
'Vietnam',
'Philippines',
'Myanmar',
'Cambodia',
'Laos',
'Taiwan',
'Brunei',
'Mongolia',
'Uzbekistan',
'Kazakhstan',
'Croatia',
'Serbia',
'Bulgaria',
'Slovakia',
'Slovenia',
'Iceland',
'Luxembourg',
'Monaco',
'Malta',
'Cyprus',
'Lebanon',
'Jordan',
'Syria',
'Yemen',
'Sudan',
'Zimbabwe',
'Zambia',
'Angola',
'Senegal',
'Cameroon',
'Ivory Coast',
'Bolivia',
'Paraguay',
'Ecuador',
'Panama',
'Costa Rica',
'Guatemala',
'Honduras',
'El Salvador',
'Nicaragua'
];

const universities = [
 { name: 'Massachusetts Institute of Technology', country: 'United States' },
{ name: 'University of Cambridge', country: 'United Kingdom' },
{ name: 'University of Oxford', country: 'United Kingdom' },
{ name: 'Harvard University', country: 'United States' },
{ name: 'Stanford University', country: 'United States' },
{ name: 'Imperial College London', country: 'United Kingdom' },
{ name: 'ETH Zurich', country: 'Switzerland' },
{ name: 'National University of Singapore', country: 'Singapore' },
{ name: 'UCL (University College London)', country: 'United Kingdom' },
{ name: 'University of California, Berkeley', country: 'United States' },
{ name: 'University of Chicago', country: 'United States' },
{ name: 'University of Pennsylvania', country: 'United States' },
{ name: 'Cornell University', country: 'United States' },
{ name: 'The University of Melbourne', country: 'Australia' },
{ name: 'California Institute of Technology', country: 'United States' },
{ name: 'Yale University', country: 'United States' },
{ name: 'Peking University', country: 'China' },
{ name: 'Princeton University', country: 'United States' },
{ name: 'The University of New South Wales', country: 'Australia' },
{ name: 'The University of Sydney', country: 'Australia' },
{ name: 'University of Toronto', country: 'Canada' },
{ name: 'National University of Singapore', country: 'Singapore' },
{ name: 'University of Edinburgh', country: 'United Kingdom' },
{ name: 'Technical University of Munich', country: 'Germany' },
{ name: 'Tsinghua University', country: 'China' },
{ name: 'Nanyang Technological University', country: 'Singapore' },
{ name: 'University of Hong Kong', country: 'Hong Kong' },
{ name: 'Johns Hopkins University', country: 'United States' },
{ name: 'University of Tokyo', country: 'Japan' },
{ name: 'University of California, Los Angeles', country: 'United States' },
{ name: 'McGill University', country: 'Canada' },
{ name: 'University of Manchester', country: 'United Kingdom' },
{ name: 'University of Michigan-Ann Arbor', country: 'United States' },
{ name: 'Australian National University', country: 'Australia' },


];

const initialForm = {
  degree: "Bachelor's",
  subject: '',
  currentEducation: '',
  result: '',
  gradingScale: 'GPA out of 5',
  countries: [],
  budget: '',
  funding: 'Scholarship preferred',
  englishTest: '',
  dreamUniversity: '',
};

function SuggestionField({
  label,
  value,
  onChange,
  suggestions,
  placeholder,
  hint,
  onSelect,
  multiple = false,
  selected = [],
}) {
  const [open, setOpen] = useState(false);

  const filtered = suggestions.filter((item) => {
    const text = typeof item === 'string' ? item : item.name;
    const alreadySelected = multiple && selected.includes(text);

    return (
      !alreadySelected &&
      text.toLowerCase().includes(value.trim().toLowerCase())
    );
  }).slice(0, 7);

  return (
    <div className="finder-field suggestion-field">
      <label>{label}</label>

      {multiple && selected.length > 0 && (
        <div className="selected-tags">
          {selected.map((item) => (
            <button
              type="button"
              className="selected-tag"
              key={item}
              onClick={() => onSelect(item)}
              aria-label={`Remove ${item}`}
            >
              {item} <span>×</span>
            </button>
          ))}
        </div>
      )}

      <div className="suggestion-control">
        <input
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);

            if (event.key === 'Enter' && filtered.length > 0) {
              event.preventDefault();
              const first = filtered[0];
              onSelect(typeof first === 'string' ? first : first.name);
              setOpen(false);
            }
          }}
          aria-expanded={open && filtered.length > 0}
          aria-autocomplete="list"
        />

        {open && filtered.length > 0 && (
          <div className="suggestion-menu">
            {filtered.map((item) => {
              const name = typeof item === 'string' ? item : item.name;
              const detail =
                typeof item === 'string' ? '' : item.country;

              return (
                <button
                  type="button"
                  className="suggestion-option"
                  key={name}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onSelect(name);
                    setOpen(false);
                  }}
                >
                  <span className="suggestion-icon">
                    {multiple ? '◎' : '↗'}
                  </span>
                  <span className="suggestion-copy">
                    <span>{name}</span>
                    {detail && <small>{detail}</small>}
                  </span>
                  <span className="suggestion-add">
                    {multiple ? '+' : '↵'}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {hint && <span className="finder-hint">{hint}</span>}
    </div>
  );
}

function UniversityFinder() {
  const [form, setForm] = useState(initialForm);

  function update(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log('University search request:', form);

    alert(
      'Your profile is ready. Real university recommendations will be available after the search service is connected.'
    );
  }

  return (
    <main className="finder-page">
      <header className="finder-header">
        <a className="finder-brand" href="/">
          <span className="finder-symbol">G</span>
          GlobalPath <span>AI</span>
        </a>
        <a className="finder-back" href="/">← Home</a>
      </header>

      <section className="finder-intro">
        <p className="finder-eyebrow">YOUR EDUCATION JOURNEY</p>
        <h1>
          Find the university
          <br />
          <span>that fits your future.</span>
        </h1>
        <p>
          Tell us about your academic background and ambitions.
          Explore study options that match your goals.
        </p>
      </section>

      <form className="finder-form" onSubmit={handleSubmit}>
        <div className="finder-form-heading">
          <div>
            <p className="finder-eyebrow">YOUR PROFILE</p>
            <h2>Let's get to know you.</h2>
          </div>
          <span className="finder-optional">* Required fields</span>
        </div>

        <section className="finder-section">
          <h3>01. Study goals</h3>

          <div className="finder-field">
            <label htmlFor="degree">Degree you want to pursue *</label>
            <select
              id="degree"
              value={form.degree}
              onChange={(e) => update('degree', e.target.value)}
              required
            >
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>PhD</option>
              <option>Other</option>
            </select>
          </div>

          <SuggestionField
            label="Subject or field of study *"
            value={form.subject}
            onChange={(value) => update('subject', value)}
            suggestions={subjects}
            placeholder="Start typing a subject..."
            hint="Choose a suggestion or enter your own subject."
            onSelect={(value) => update('subject', value)}
          />

          <SuggestionField
            label="Preferred countries"
            value={form.countrySearch || ''}
            onChange={(value) => update('countrySearch', value)}
            suggestions={countries}
            placeholder="Search and select countries..."
            selected={form.countries}
            multiple
            onSelect={(value) => {
              update(
                'countries',
                form.countries.includes(value)
                  ? form.countries.filter((country) => country !== value)
                  : [...form.countries, value]
              );
              update('countrySearch', '');
            }}
            hint="Select more than one country, or leave blank to explore worldwide."
          />

          <SuggestionField
            label="Dream university (optional)"
            value={form.dreamUniversity}
            onChange={(value) => update('dreamUniversity', value)}
            suggestions={universities}
            placeholder="Search a university..."
            onSelect={(value) => update('dreamUniversity', value)}
            hint="Suggestions come from a starter list and are not live AI results yet."
          />
        </section>

        <section className="finder-section">
          <h3>02. Academic background</h3>

          <div className="finder-field">
            <label htmlFor="currentEducation">Current or most recent qualification *</label>
            <select
              id="currentEducation"
              value={form.currentEducation}
              onChange={(e) => update('currentEducation', e.target.value)}
              required
            >
              <option value="">Select your qualification</option>
              <option>SSC / O Level</option>
              <option>HSC / A Level</option>
              <option>Diploma</option>
              <option>Bachelor's degree</option>
              <option>Master's degree</option>
              <option>Other</option>
            </select>
          </div>

          <div className="finder-field">
            <label htmlFor="result">GPA, CGPA or percentage *</label>
            <input
              id="result"
              value={form.result}
              onChange={(e) => update('result', e.target.value)}
              placeholder="e.g. 4.80, 3.65 or 85%"
              required
            />
          </div>

          <div className="finder-field">
            <label htmlFor="gradingScale">Grading scale *</label>
            <select
              id="gradingScale"
              value={form.gradingScale}
              onChange={(e) => update('gradingScale', e.target.value)}
              required
            >
              <option>GPA out of 5</option>
              <option>CGPA out of 4</option>
              <option>Percentage</option>
              <option>Other grading scale</option>
            </select>
          </div>

          <div className="finder-field">
            <label htmlFor="englishTest">English test (optional)</label>
            <select
              id="englishTest"
              value={form.englishTest}
              onChange={(e) => update('englishTest', e.target.value)}
            >
              <option value="">Not taken / Not decided</option>
              <option>IELTS</option>
              <option>TOEFL</option>
              <option>Duolingo English Test</option>
              <option>Other</option>
            </select>
          </div>
        </section>

        <section className="finder-section">
          <h3>03. Budget and funding</h3>

          <div className="finder-field">
            <label htmlFor="budget">Approximate annual budget</label>
            <select
              id="budget"
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
            >
              <option value="">Not decided yet</option>
              <option>Under $3,000</option>
              <option>$3,000–$7,000</option>
              <option>$7,000–$15,000</option>
              <option>$15,000–$30,000</option>
              <option>Over $30,000</option>
            </select>
            <span className="finder-hint">
              Approximate yearly study and living budget in USD.
            </span>
          </div>

          <div className="finder-field">
            <label htmlFor="funding">Funding preference</label>
            <select
              id="funding"
              value={form.funding}
              onChange={(e) => update('funding', e.target.value)}
            >
              <option>Scholarship preferred</option>
              <option>Full scholarship required</option>
              <option>Partial scholarship</option>
              <option>Self-funded</option>
              <option>Open to all options</option>
            </select>
          </div>
        </section>

        <button className="finder-submit" type="submit">
          Find My Universities <span aria-hidden="true">↗</span>
        </button>

        <p className="finder-privacy">
          Your recommendations will require a connected search service.
        </p>
      </form>

      <footer className="finder-footer">© 2026 GlobalPath AI</footer>
    </main>
  );
}

export default UniversityFinder;
