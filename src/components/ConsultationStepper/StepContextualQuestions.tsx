'use client';

/**
 * StepContextualQuestions — Step 2 of the Consultation Stepper
 * Conditional questions based on service selection
 */

import React from 'react';
import { FormInput } from '@/theme/components/form/FormInput';
import { FormTextarea } from '@/theme/components/form/FormTextarea';
import { FormSelect } from '@/theme/components/form/FormSelect';
import FxButton from '@/theme/components/dsm/FxButton';
import { getQuestionSet } from './constants';
import { ServiceKey, StepOneData, StepTwoData, Question } from './types';

// Map service keys to readable labels for section headings
const SERVICE_OPTIONS_LABELS: Partial<Record<ServiceKey, string>> = {
  personal_training: 'Personal Training',
  it_consulting: 'IT Consulting',
  graphic_design: 'Graphic Design',
  web_development: 'Web Development',
  resonance_coaching: 'Resonance Coaching',
};

interface StepContextualQuestionsProps {
  step1: StepOneData;
  data: StepTwoData;
  onChange: (data: StepTwoData) => void;
  onNext: () => void;
  onBack: () => void;
}

function FileUploadField({
  question,
  file,
  onChange,
}: {
  question: Question;
  file: File | null | undefined;
  onChange: (file: File | null) => void;
}) {
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && question.maxSize && f.size > question.maxSize) {
      setError(`File too large. Maximum size is ${Math.round(question.maxSize / 1024 / 1024)} MB.`);
      onChange(null);
      return;
    }
    setError('');
    onChange(f);
  };

  return (
    <div>
      <p
        style={{
          fontWeight: 600,
          color: 'var(--fx-text-heading)',
          marginBottom: '0.5rem',
          display: 'block',
        }}
      >
        {question.label}
      </p>
      <input
        type='file'
        accept={question.accept}
        onChange={handleChange}
        aria-label={question.label}
        style={{
          fontSize: 'var(--fx-body-sm-size)',
          color: 'var(--fx-text-heading)',
        }}
      />
      {file && (
        <p style={{ color: 'var(--fx-text-muted)', fontSize: 'var(--fx-body-sm-size)', marginTop: '4px' }}>
          Selected: {file.name}
        </p>
      )}
      {error && (
        <p style={{ color: 'var(--fx-error)', fontSize: 'var(--fx-body-sm-size)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export const StepContextualQuestions: React.FC<StepContextualQuestionsProps> = ({
  step1,
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const services = step1.services.filter((s): s is ServiceKey => s !== 'help_me_choose');
  const questionSet = getQuestionSet(step1.services);

  const isHelpMeChoose =
    step1.services.length === 1 && step1.services[0] === 'help_me_choose';

  const updateAnswer = (id: string, value: string) => {
    onChange({ ...data, answers: { ...data.answers, [id]: value } });
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const updateFile = (file: File | null) => {
    onChange({ ...data, fileUpload: file });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const q of questionSet.questions) {
      if (q.type === 'file') continue;
      if (q.required && !data.answers[q.id]?.trim()) {
        newErrors[q.id] = 'This field is required.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!isHelpMeChoose && !validate()) return;
    onNext();
  };

  const renderQuestion = (question: Question) => {
    if (question.type === 'file') {
      return (
        <FileUploadField
          key={question.id}
          question={question}
          file={data.fileUpload}
          onChange={updateFile}
        />
      );
    }

    if (question.type === 'dropdown' && question.options) {
      return (
        <FormSelect
          key={question.id}
          label={question.label}
          value={data.answers[question.id] || ''}
          options={question.options}
          onChange={(value) => updateAnswer(question.id, value)}
          placeholder='Select an option…'
          aria-label={question.label}
        />
      );
    }

    if (question.type === 'textarea') {
      return (
        <FormTextarea
          key={question.id}
          label={question.label}
          value={data.answers[question.id] || ''}
          onChange={(value) => updateAnswer(question.id, value)}
          placeholder={question.placeholder}
          requiredIndicator={question.required}
          required={question.required}
          rows={3}
        />
      );
    }

    return (
      <FormInput
        key={question.id}
        label={question.label}
        value={data.answers[question.id] || ''}
        onChange={(value) => updateAnswer(question.id, value)}
        placeholder={question.placeholder}
        requiredIndicator={question.required}
        required={question.required}
        type='text'
      />
    );
  };

  const sectionTitle =
    services.length === 1
      ? `Questions about ${
          SERVICE_OPTIONS_LABELS[services[0]] ?? 'your service'
        }`
      : 'Questions about your needs';

  return (
    <div>
      <h3
        style={{
          color: 'var(--fx-accent)',
          marginBottom: '4px',
          fontSize: 'var(--fx-h3-size)',
          fontWeight: 'var(--fx-h3-weight)',
          letterSpacing: 'var(--fx-heading-tracking)',
        }}
      >
        Step 2 — Tell us a little about your needs
      </h3>
      <p
        style={{
          color: 'var(--fx-text-muted)',
          marginBottom: '20px',
          fontSize: 'var(--fx-body-sm-size)',
        }}
      >
        {isHelpMeChoose
          ? "No worries — we'll explore what fits best on the call. Just complete your contact details in the next step."
          : 'Answer as many as you can. These help us make the most of our time together.'}
      </p>

      {!isHelpMeChoose && (
        <>
          {(services.length > 1 || step1.services.includes('help_me_choose') === false) && (
            <h4
              style={{
                color: 'var(--fx-text-heading)',
                marginBottom: '16px',
                fontSize: 'var(--fx-subhead-size)',
                fontWeight: 'var(--fx-subhead-weight)',
              }}
            >
              {sectionTitle}
            </h4>
          )}

          <div className='flex flex-col gap-4'>
            {questionSet.questions.map((q) => (
              <div key={q.id}>
                {renderQuestion(q)}
                {errors[q.id] && (
                  <div role='alert'>
                    <p style={{ color: 'var(--fx-error)', fontSize: 'var(--fx-body-sm-size)', marginTop: '4px' }}>
                      {errors[q.id]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <div className='flex justify-between mt-6'>
        <FxButton variant="outline" size="md" onClick={onBack}>
          &larr; Back
        </FxButton>
        <FxButton variant="primary" size="md" onClick={handleNext}>
          Next: Contact &amp; Schedule &rarr;
        </FxButton>
      </div>
    </div>
  );
};
