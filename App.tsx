
import React, { useState } from 'react';
import { FormData, FormStep, YesNo, FamilyMember } from './types';
import { RadioGroup, TextField, TextArea, SectionHeader } from './components/Input';
import { 
  ShieldAlert, 
  History, 
  Activity, 
  HeartPulse, 
  Users, 
  Search, 
  Stethoscope, 
  TestTube, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  FileText,
  User
} from 'lucide-react';

const INITIAL_STATE: FormData = {
  covidDiagnosed: '',
  covidSymptoms: '',
  covidSelfIsolate: '',
  underMedicalCare: '',
  seenGPIn2Years: '',
  referredConsultant: '',
  hadSpecialScans: '',
  takenNonPrescribedDrugs: '',
  inPatientOutPatient: '',
  currentlyTakingMedication: '',
  medicationDetails: [],
  livedOutsideUK: '',
  timeOffWork: '',
  heartDisease: '',
  respiratoryDisease: '',
  digestiveDisease: '',
  mentalDisorder: '',
  nervousDisorder: '',
  glandularDisorder: '',
  skinDisorder: '',
  musclesJointsDisorder: '',
  genitoUrinaryDisorder: '',
  bloodDisorder: '',
  cancerHistory: '',
  physicalInjury: '',
  otherIllness: '',
  systemicDetails: {},
  hivRisk: '',
  stdPositive: '',
  hepatitisPositive: '',
  smoker: '',
  pastSmoker: '',
  stoppedOnMedicalAdvice: '',
  nicotineProducts: '',
  drinksAlcohol: '',
  alcoholAdvisedToReduce: '',
  weightChanged12Months: '',
  exerciseRegularly: '',
  familyHistory: [],
  examinerKnowledge: '',
  appearanceConsistent: '',
  appearanceAbnormal: '',
  misuseSigns: '',
  nicotineStaining: '',
  clubbingNails: '',
  height: '',
  weight: '',
  abdominalGirth: '',
  hips: '',
  heartSoundsAbnormal: '',
  heartMurmurs: '',
  heartEnlarged: '',
  varicoseVeins: '',
  pulsesWeak: '',
  bpReading1: '',
  bpReading2: '',
  bpReading3: '',
  pulseCharacter: '',
  chestAbnormality: '',
  lungAbnormality: '',
  peakFlow: '',
  tongueAbnormality: '',
  abdomenAbnormality: '',
  scars: '',
  endocrineAbnormality: '',
  musculoSkeletalProblem: '',
  upperLimbsAbnormality: '',
  lowerLimbsAbnormality: '',
  centralNervousSystemAbnormality: '',
  psychiatricTendency: '',
  tremors: '',
  pupilsAbnormal: '',
  cranialNervesAbnormal: '',
  reflexesAbnormal: '',
  eyesAbnormal: '',
  earsAbnormal: '',
  protein: '',
  blood: '',
  sugar: '',
  suspectSample: '',
  sentToLab: '',
  cotinineTest: '',
  examinerComments: '',
  checklistFullyAnswered: false,
  checklistSigned: false,
  checklistBloodTaken: false,
  bloodSampleComments: ''
};

const STEPS = [
  { id: FormStep.COVID, label: 'COVID-19 Pre-Screen', icon: ShieldAlert },
  { id: FormStep.HISTORY, label: 'Medical History', icon: History },
  { id: FormStep.SYSTEMIC, label: 'Systemic Review', icon: Activity },
  { id: FormStep.LIFESTYLE, label: 'Lifestyle Habits', icon: HeartPulse },
  { id: FormStep.FAMILY, label: 'Family History', icon: Users },
  { id: FormStep.EXAMINER, label: 'Examiner Observations', icon: Search },
  { id: FormStep.PHYSICAL, label: 'Physical Examination', icon: Stethoscope },
  { id: FormStep.LABS, label: 'Urinalysis & Labs', icon: TestTube },
  { id: FormStep.REVIEW, label: 'Final Review', icon: CheckCircle2 }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.COVID);
  const [data, setData] = useState<FormData>(INITIAL_STATE);

  const updateField = (field: keyof FormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < FormStep.REVIEW) setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep > FormStep.COVID) setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addFamilyMember = () => {
    setData(prev => ({
      ...prev,
      familyHistory: [...prev.familyHistory, { relation: '', age: '', diagnosis: '', ageAtDeath: '' }]
    }));
  };

  const removeFamilyMember = (index: number) => {
    setData(prev => ({
      ...prev,
      familyHistory: prev.familyHistory.filter((_, i) => i !== index)
    }));
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string) => {
    const newHistory = [...data.familyHistory];
    newHistory[index] = { ...newHistory[index], [field]: value };
    updateField('familyHistory', newHistory);
  };

  const addMedication = () => {
    updateField('medicationDetails', [
      ...(data.medicationDetails || []),
      { name: '', dosage: '', purpose: '', duration: '' }
    ]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.COVID:
        return (
          <div className="space-y-6">
            <SectionHeader title="Pre-Screening: Coronavirus Questions" subtitle="Initial safety assessment" />
            <RadioGroup
              label="1. Has a medical professional formally diagnosed you with Coronavirus?"
              value={data.covidDiagnosed}
              onChange={v => updateField('covidDiagnosed', v)}
            />
            {data.covidDiagnosed === 'Yes' && (
              <TextArea label="Please provide details" value={data.covidDiagnosedDetails || ''} onChange={v => updateField('covidDiagnosedDetails', v)} />
            )}

            <RadioGroup
              label="2. In the last month have you had a new, continuous cough and/or high temperature and/or loss or change of your sense of smell or taste, do you live with someone who has had a new, continuous cough and/or high temperature, or have you had direct contact with someone who's been confirmed or suspected to have Coronavirus?"
              value={data.covidSymptoms}
              onChange={v => updateField('covidSymptoms', v)}
            />
            {data.covidSymptoms === 'Yes' && (
              <TextArea label="Please provide details" value={data.covidSymptomsDetails || ''} onChange={v => updateField('covidSymptomsDetails', v)} />
            )}

            <RadioGroup
              label="3. Have you been told to self-isolate (stay in your home) as a result of government advice or the advice of a medical professional over the last month?"
              value={data.covidSelfIsolate}
              onChange={v => updateField('covidSelfIsolate', v)}
            />
            {data.covidSelfIsolate === 'Yes' && (
              <TextArea label="Please provide details" value={data.covidSelfIsolateDetails || ''} onChange={v => updateField('covidSelfIsolateDetails', v)} />
            )}
          </div>
        );

      case FormStep.HISTORY:
        return (
          <div className="space-y-6">
            <SectionHeader title="Medical History" subtitle="General medical background and care" />
            <RadioGroup
              label="4. Are you at present under medical care or receiving treatment, awaiting investigations or the results of investigations?"
              value={data.underMedicalCare}
              onChange={v => updateField('underMedicalCare', v)}
            />
            {data.underMedicalCare === 'Yes' && (
              <TextArea label="Please provide details" value={data.underMedicalCareDetails || ''} onChange={v => updateField('underMedicalCareDetails', v)} />
            )}
            
            <RadioGroup
              label="5. Have you seen any doctor (GP) in the last 2 years? (this includes online / video consultations)"
              value={data.seenGPIn2Years}
              onChange={v => updateField('seenGPIn2Years', v)}
            />
            {data.seenGPIn2Years === 'Yes' && (
              <TextArea label="Please provide details" value={data.seenGPIn2YearsDetails || ''} onChange={v => updateField('seenGPIn2YearsDetails', v)} />
            )}

            <RadioGroup
              label="6. Have you ever been referred for any consultant's opinion or undergone any special examination?"
              value={data.referredConsultant}
              onChange={v => updateField('referredConsultant', v)}
            />
            {data.referredConsultant === 'Yes' && (
              <TextArea label="Please provide details" value={data.referredConsultantDetails || ''} onChange={v => updateField('referredConsultantDetails', v)} />
            )}

            <RadioGroup
              label="7. Have you ever had any chest x-rays, ECG, MRI scan, blood or urine tests or any other screening procedure or investigation?"
              value={data.hadSpecialScans}
              onChange={v => updateField('hadSpecialScans', v)}
            />
            {data.hadSpecialScans === 'Yes' && (
              <TextArea label="Give reasons, dates and results" value={data.hadSpecialScansDetails || ''} onChange={v => updateField('hadSpecialScansDetails', v)} />
            )}

            <RadioGroup
              label="8. Have you ever taken drugs other than those prescribed by any doctor?"
              value={data.takenNonPrescribedDrugs}
              onChange={v => updateField('takenNonPrescribedDrugs', v)}
            />
            {data.takenNonPrescribedDrugs === 'Yes' && (
              <TextArea label="Please provide details" value={data.takenNonPrescribedDrugsDetails || ''} onChange={v => updateField('takenNonPrescribedDrugsDetails', v)} />
            )}

            <RadioGroup
              label="9. Have you been an in-patient or out-patient at a hospital, nursing home or special clinic?"
              value={data.inPatientOutPatient}
              onChange={v => updateField('inPatientOutPatient', v)}
            />
            {data.inPatientOutPatient === 'Yes' && (
              <TextArea label="Please provide details" value={data.inPatientOutPatientDetails || ''} onChange={v => updateField('inPatientOutPatientDetails', v)} />
            )}

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-slate-800">10. Are you currently taking any medication?</h4>
                <button 
                  onClick={addMedication}
                  className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                >
                  <Plus size={14} /> Add Med
                </button>
              </div>
              {data.medicationDetails?.map((med, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg mb-2 relative">
                  <TextField label="Name" value={med.name} onChange={v => {
                    const next = [...(data.medicationDetails || [])];
                    next[idx].name = v;
                    updateField('medicationDetails', next);
                  }} />
                  <TextField label="Dosage" value={med.dosage} onChange={v => {
                    const next = [...(data.medicationDetails || [])];
                    next[idx].dosage = v;
                    updateField('medicationDetails', next);
                  }} />
                  <TextField label="Purpose" value={med.purpose} onChange={v => {
                    const next = [...(data.medicationDetails || [])];
                    next[idx].purpose = v;
                    updateField('medicationDetails', next);
                  }} />
                  <TextField label="Duration" value={med.duration} onChange={v => {
                    const next = [...(data.medicationDetails || [])];
                    next[idx].duration = v;
                    updateField('medicationDetails', next);
                  }} />
                </div>
              ))}
            </div>

            <RadioGroup
              label="11. Have you ever been resident or travelled outside of the UK or Ireland for more than 3 months in the last 5 years?"
              value={data.livedOutsideUK}
              onChange={v => updateField('livedOutsideUK', v)}
            />
            {data.livedOutsideUK === 'Yes' && (
              <TextArea label="Please provide details" value={data.livedOutsideUKDetails || ''} onChange={v => updateField('livedOutsideUKDetails', v)} />
            )}

            <RadioGroup
              label="12. Have you had any time off work during the last 5 years?"
              value={data.timeOffWork}
              onChange={v => updateField('timeOffWork', v)}
            />
            {data.timeOffWork === 'Yes' && (
              <TextArea label="Please provide details" value={data.timeOffWorkDetails || ''} onChange={v => updateField('timeOffWorkDetails', v)} />
            )}
          </div>
        );

      case FormStep.SYSTEMIC:
        const systems = [
          { num: 13, key: 'heartDisease', label: 'Heart or Circulatory system: Any disease or disorder such as: Rheumatic fever, heart attack, stroke, angina, chest pains, shortness of breath, palpitations, high blood pressure, raised cholesterol, heart murmur or other disorders?' },
          { num: 14, key: 'respiratoryDisease', label: 'Respiratory system: Any disease or disorder such as: Asthma, bronchitis, pneumonia, tuberculosis, emphysema, pleurisy, whooping cough, coughing of blood or other lung disorder?' },
          { num: 15, key: 'digestiveDisease', label: 'Digestive system: Any disease or disorder such as: Abdominal pain, Persistent or recurrent indigestion or peptic ulcer, Jaundice, hepatitis or other liver disorder, Gall Stones, Hiatus Hernia, Persistent Diarrhoea, intestinal complaint, unexplained weight loss, Colitis, Rectal Bleeding?' },
          { num: 16, key: 'mentalDisorder', label: 'Mental disorder: Such as: Anxiety, depression, psychosis or schizophrenia?' },
          { num: 17, key: 'nervousDisorder', label: 'Nervous disorder: Such as: Severe Headaches, Migraine, Convulsions, Fits, Epilepsy, Double Vision, Fainting, Giddiness, Numbness or Paralysis or Multiple Sclerosis?' },
          { num: 18, key: 'glandularDisorder', label: 'Glandular: Diabetes, thyroid disorder or any other glandular disorder?' },
          { num: 19, key: 'skinDisorder', label: 'Skin: Any skin disorders such as: Eczema, Psoriasis, moles, lesions?' },
          { num: 20, key: 'musclesJointsDisorder', label: 'Muscles/Joints: Any Rheumatism, arthritis, back pain, gout or any other disorder of the joints or muscles?' },
          { num: 21, key: 'genitoUrinaryDisorder', label: 'Genito-urinary: Any disease or disorder of the Kidneys, bladder, prostate, genital organs, gynaecological or obstetric problems (including gynaecological complaints or abnormal smears)? Or other genito-urinary disease including any presence of blood, glucose or protein in the urine?' },
          { num: 22, key: 'bloodDisorder', label: 'Blood: Any type of blood disorder, transfusions or have you ever received blood products or surgery outside of the UK or Ireland?' },
          { num: 23, key: 'cancerHistory', label: 'Cancer: Any history of a tumour or cancer?' },
          { num: 24, key: 'physicalInjury', label: 'Physical: Any injury, operation, or physical deformity?' },
          { num: 25, key: 'otherIllness', label: 'Other: Any other illness not mentioned above?' },
        ];
        return (
          <div className="space-y-6">
            <SectionHeader title="Systemic Review" subtitle="Specific medical conditions" />
            {systems.map(s => (
              <div key={s.key} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <RadioGroup
                  label={`${s.num}. ${s.label}`}
                  value={(data as any)[s.key]}
                  onChange={v => updateField(s.key as any, v)}
                />
                {(data as any)[s.key] === 'Yes' && (
                  <TextArea 
                    label="Please provide details" 
                    value={data.systemicDetails[s.key] || ''} 
                    onChange={v => updateField('systemicDetails', { ...data.systemicDetails, [s.key]: v })}
                  />
                )}
              </div>
            ))}
          </div>
        );

      case FormStep.LIFESTYLE:
        return (
          <div className="space-y-6">
            <SectionHeader title="Lifestyle Section" subtitle="Habits, health, and history" />
            <RadioGroup label="26. In the last 5 years, have you been exposed to the risk of HIV infection?" value={data.hivRisk} onChange={v => updateField('hivRisk', v)} />
            {data.hivRisk === 'Yes' && (
              <TextArea label="Please provide details" value={data.hivRiskDetails || ''} onChange={v => updateField('hivRiskDetails', v)} />
            )}

            <RadioGroup label="27. Have you ever tested positive for any other sexually transmitted disease, or are you awaiting the results of such a test?" value={data.stdPositive} onChange={v => updateField('stdPositive', v)} />
            {data.stdPositive === 'Yes' && (
              <TextArea label="Please provide details" value={data.stdPositiveDetails || ''} onChange={v => updateField('stdPositiveDetails', v)} />
            )}

            <RadioGroup label="28. Have you ever tested positive for HIV / AIDS, Hepatitis B or C, or are you awaiting the results of such a test?" value={data.hepatitisPositive} onChange={v => updateField('hepatitisPositive', v)} />
            {data.hepatitisPositive === 'Yes' && (
              <TextArea label="Please provide details" value={data.hepatitisPositiveDetails || ''} onChange={v => updateField('hepatitisPositiveDetails', v)} />
            )}

            <RadioGroup label="29. Do you smoke?" value={data.smoker} onChange={v => updateField('smoker', v)} />
            {data.smoker === 'Yes' && (
              <div className="ml-8 border-l-2 border-blue-100 pl-4 space-y-4">
                <TextField label="30. How many cigarettes, cigars, or grams of tobacco do you smoke daily?" value={data.smokeDailyAmount || ''} onChange={v => updateField('smokeDailyAmount', v)} />
              </div>
            )}
            
            <RadioGroup label="31. Have you ever smoked in the past?" value={data.pastSmoker} onChange={v => updateField('pastSmoker', v)} />
            {data.pastSmoker === 'Yes' && (
              <div className="ml-8 border-l-2 border-blue-100 pl-4 space-y-4">
                <TextField label="32. If you are a former smoker, when did you stop?" value={data.stoppedSmokingDate || ''} onChange={v => updateField('stoppedSmokingDate', v)} />
                <RadioGroup label="33. Did you stop smoking on medical advice?" value={data.stoppedOnMedicalAdvice} onChange={v => updateField('stoppedOnMedicalAdvice', v)} />
                {data.stoppedOnMedicalAdvice === 'Yes' && <TextArea label="Details" value={data.stoppedOnMedicalAdviceDetails || ''} onChange={v => updateField('stoppedOnMedicalAdviceDetails', v)} />}
              </div>
            )}

            <RadioGroup label="34. Have you used nicotine replacement products such as nicotine patches, gum or E-cigarettes in the last 12 months?" value={data.nicotineProducts} onChange={v => updateField('nicotineProducts', v)} />
            {data.nicotineProducts === 'Yes' && <TextArea label="Please provide details" value={data.nicotineProductsDetails || ''} onChange={v => updateField('nicotineProductsDetails', v)} />}

            <RadioGroup label="35. Do you drink alcohol?" value={data.drinksAlcohol} onChange={v => updateField('drinksAlcohol', v)} />
            {data.drinksAlcohol === 'Yes' && (
              <div className="ml-8 border-l-2 border-blue-100 pl-4 space-y-4">
                <TextField label="36. What is your weekly consumption of units (Beer, Cider, Wine, Spirits, Alcopops)?" value={data.alcoholUnitsPerWeek || ''} onChange={v => updateField('alcoholUnitsPerWeek', v)} />
                <RadioGroup label="38. Have you ever been advised to reduce the amount you drink, or have you ever received alcohol related counselling?" value={data.alcoholAdvisedToReduce} onChange={v => updateField('alcoholAdvisedToReduce', v)} />
                {data.alcoholAdvisedToReduce === 'Yes' && <TextArea label="Please provide details" value={data.alcoholAdvisedToReduceDetails || ''} onChange={v => updateField('alcoholAdvisedToReduceDetails', v)} />}
              </div>
            )}
            {data.drinksAlcohol === 'No' && (
              <div className="ml-8 border-l-2 border-blue-100 pl-4">
                <TextField label="37. If a total abstainer, how long have you been so?" value={data.abstainerDuration || ''} onChange={v => updateField('abstainerDuration', v)} />
              </div>
            )}

            <RadioGroup label="39. Has your weight significantly changed in the last 12 months?" value={data.weightChanged12Months} onChange={v => updateField('weightChanged12Months', v)} />
            {data.weightChanged12Months === 'Yes' && (
              <TextArea label="Amount of loss/gain and reason" value={data.weightChangeDetails || ''} onChange={v => updateField('weightChangeDetails', v)} />
            )}

            <RadioGroup label="40. Do you exercise regularly?" value={data.exerciseRegularly} onChange={v => updateField('exerciseRegularly', v)} />
            {data.exerciseRegularly === 'Yes' && (
              <TextField label="Type and frequency" value={data.exerciseDetails || ''} onChange={v => updateField('exerciseDetails', v)} />
            )}
          </div>
        );

      case FormStep.FAMILY:
        return (
          <div className="space-y-6">
            <SectionHeader title="Family History" subtitle="Hereditary conditions" />
            <p className="text-sm font-semibold text-slate-700 mb-2">
              41. Have your natural parents, brothers or sisters ever suffered from heart disease, hypertension, stroke, diabetes, raised cholesterol, cancer, kidney disease, multiple sclerosis and Huntington's disease or any other hereditary disorder?
            </p>
            <div className="space-y-4">
              {data.familyHistory.map((member, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg relative bg-white shadow-sm">
                  <button onClick={() => removeFamilyMember(idx)} className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TextField label="Family Member" value={member.relation} onChange={v => updateFamilyMember(idx, 'relation', v)} />
                    <TextField label="Age" value={member.age} onChange={v => updateFamilyMember(idx, 'age', v)} />
                    <TextField label="Diagnosis" value={member.diagnosis} onChange={v => updateFamilyMember(idx, 'diagnosis', v)} />
                    <TextField label="Age at Death" value={member.ageAtDeath || ''} onChange={v => updateFamilyMember(idx, 'ageAtDeath', v)} />
                  </div>
                </div>
              ))}
              <button onClick={addFamilyMember} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> Add Family Member Record
              </button>
            </div>
          </div>
        );

      case FormStep.EXAMINER:
        return (
          <div className="space-y-6">
            <SectionHeader title="Medical Examiner's Observations" subtitle="Clinical notes" />
            <RadioGroup label="42. Have you any personal or professional knowledge of the examinee?" value={data.examinerKnowledge} onChange={v => updateField('examinerKnowledge', v)} />
            {data.examinerKnowledge === 'Yes' && <TextArea label="Please provide details" value={data.examinerKnowledgeDetails || ''} onChange={v => updateField('examinerKnowledgeDetails', v)} />}

            <RadioGroup 
              label="43. Is the examinee's appearance inconsistent or consistent with the stated age?" 
              value={data.appearanceConsistent} 
              onChange={v => updateField('appearanceConsistent', v)} 
              options={[{ label: 'Consistent', value: 'Yes' }, { label: 'Inconsistent', value: 'No' }]}
            />
            {data.appearanceConsistent === 'No' && <TextArea label="Details on inconsistency" value={data.appearanceConsistentDetails || ''} onChange={v => updateField('appearanceConsistentDetails', v)} />}

            <RadioGroup label="44. Is the customer's general appearance abnormal in any way?" value={data.appearanceAbnormal} onChange={v => updateField('appearanceAbnormal', v)} />
            {data.appearanceAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.appearanceAbnormalDetails || ''} onChange={v => updateField('appearanceAbnormalDetails', v)} />}

            <RadioGroup label="45. Are there any signs of past or present alcohol, drugs or tobacco misuse?" value={data.misuseSigns} onChange={v => updateField('misuseSigns', v)} />
            {data.misuseSigns === 'Yes' && <TextArea label="Please provide details" value={data.misuseSignsDetails || ''} onChange={v => updateField('misuseSignsDetails', v)} />}

            <RadioGroup label="46. Is there any nicotine staining?" value={data.nicotineStaining} onChange={v => updateField('nicotineStaining', v)} />
            {data.nicotineStaining === 'Yes' && <TextArea label="Please provide details" value={data.nicotineStainingDetails || ''} onChange={v => updateField('nicotineStainingDetails', v)} />}

            <RadioGroup label="47. Is there any clubbing of the nails?" value={data.clubbingNails} onChange={v => updateField('clubbingNails', v)} />
            {data.clubbingNails === 'Yes' && <TextArea label="Please provide details" value={data.clubbingNailsDetails || ''} onChange={v => updateField('clubbingNailsDetails', v)} />}
          </div>
        );

      case FormStep.PHYSICAL:
        return (
          <div className="space-y-6">
            <SectionHeader title="Physical Examination" subtitle="Measurements & Clinical Findings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField label="48. Height (without shoes)" value={data.height} onChange={v => updateField('height', v)} suffix="cm" />
              <TextField label="49. Weight (without shoes)" value={data.weight} onChange={v => updateField('weight', v)} suffix="kg" />
              <TextField label="50. Abdominal girth (at Umbilicus)" value={data.abdominalGirth} onChange={v => updateField('abdominalGirth', v)} suffix="cm" />
              <TextField label="51. Hips (at broadest)" value={data.hips} onChange={v => updateField('hips', v)} suffix="cm" />
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-slate-800">Cardiovascular</h4>
              <RadioGroup label="52. Are the heart sounds abnormal or is there any irregularity of rhythm?" value={data.heartSoundsAbnormal} onChange={v => updateField('heartSoundsAbnormal', v)} />
              {data.heartSoundsAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.heartSoundsAbnormalDetails || ''} onChange={v => updateField('heartSoundsAbnormalDetails', v)} />}

              <RadioGroup label="53. Are there any murmurs? (If yes, provide timing, site, radiation, character, etc.)" value={data.heartMurmurs} onChange={v => updateField('heartMurmurs', v)} />
              {data.heartMurmurs === 'Yes' && <TextArea label="Provide full murmur details" value={data.heartMurmurDetails || ''} onChange={v => updateField('heartMurmurDetails', v)} />}

              <RadioGroup label="54. Does the heart appear to be enlarged?" value={data.heartEnlarged} onChange={v => updateField('heartEnlarged', v)} />
              {data.heartEnlarged === 'Yes' && <TextArea label="Please provide details" value={data.heartEnlargedDetails || ''} onChange={v => updateField('heartEnlargedDetails', v)} />}

              <RadioGroup label="55. Are there any varicose veins?" value={data.varicoseVeins} onChange={v => updateField('varicoseVeins', v)} />
              {data.varicoseVeins === 'Yes' && <TextArea label="Please provide details" value={data.varicoseVeinsDetails || ''} onChange={v => updateField('varicoseVeinsDetails', v)} />}

              <RadioGroup label="56. Are any of the peripheral pulses weak or absent?" value={data.pulsesWeak} onChange={v => updateField('pulsesWeak', v)} />
              {data.pulsesWeak === 'Yes' && <TextArea label="Please provide details" value={data.pulsesWeakDetails || ''} onChange={v => updateField('pulsesWeakDetails', v)} />}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField label="57. Blood Pressure: Record three readings if initial is above 140/90. (R1)" value={data.bpReading1} onChange={v => updateField('bpReading1', v)} placeholder="120/80" />
                <TextField label="BP Reading 2" value={data.bpReading2} onChange={v => updateField('bpReading2', v)} />
                <TextField label="BP Reading 3" value={data.bpReading3} onChange={v => updateField('bpReading3', v)} />
              </div>
              <RadioGroup 
                label="58. Pulse Character: Is it Strong, Weak, Regular, or Irregular?" 
                value={data.pulseCharacter} 
                onChange={v => updateField('pulseCharacter', v)} 
                options={[{ label: 'Strong', value: 'Strong' }, { label: 'Weak', value: 'Weak' }, { label: 'Regular', value: 'Regular' }, { label: 'Irregular', value: 'Irregular' }]}
              />
              {data.pulseCharacter !== '' && data.pulseCharacter !== 'Regular' && <TextArea label="Please provide pulse details" value={data.pulseCharacterDetails || ''} onChange={v => updateField('pulseCharacterDetails', v)} />}
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-slate-800">Chest & Abdomen</h4>
              <RadioGroup label="59. Is there any abnormality in the shape or development of the chest?" value={data.chestAbnormality} onChange={v => updateField('chestAbnormality', v)} />
              {data.chestAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.chestAbnormalityDetails || ''} onChange={v => updateField('chestAbnormalityDetails', v)} />}

              <RadioGroup label="60. Are there any signs of abnormal lung function?" value={data.lungAbnormality} onChange={v => updateField('lungAbnormality', v)} />
              {data.lungAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.lungAbnormalityDetails || ''} onChange={v => updateField('lungAbnormalityDetails', v)} />}

              <TextField label="61. Peak Flow Rate reading in Litres/Min" value={data.peakFlow} onChange={v => updateField('peakFlow', v)} suffix="L/Min" />

              <RadioGroup label="62. Is there any abnormality of the tongue?" value={data.tongueAbnormality} onChange={v => updateField('tongueAbnormality', v)} />
              {data.tongueAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.tongueAbnormalityDetails || ''} onChange={v => updateField('tongueAbnormalityDetails', v)} />}

              <RadioGroup label="63. Is there any abnormal tenderness, enlargement of liver or spleen or other palpable abnormality?" value={data.abdomenAbnormality} onChange={v => updateField('abdomenAbnormality', v)} />
              {data.abdomenAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.abdomenAbnormalityDetails || ''} onChange={v => updateField('abdomenAbnormalityDetails', v)} />}

              <RadioGroup label="64. Are there any scars of material significance?" value={data.scars} onChange={v => updateField('scars', v)} />
              {data.scars === 'Yes' && <TextArea label="Please provide details" value={data.scarsDetails || ''} onChange={v => updateField('scarsDetails', v)} />}

              <RadioGroup label="65. Is there any enlargement of the lymph nodes or thyroid gland or any other glandular disorder?" value={data.endocrineAbnormality} onChange={v => updateField('endocrineAbnormality', v)} />
              {data.endocrineAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.endocrineAbnormalityDetails || ''} onChange={v => updateField('endocrineAbnormalityDetails', v)} />}

              <RadioGroup label="66. Are there any problems with spinal movements (pain/restriction) or deformities/swelling of joints?" value={data.musculoSkeletalProblem} onChange={v => updateField('musculoSkeletalProblem', v)} />
              {data.musculoSkeletalProblem === 'Yes' && <TextArea label="Please provide details" value={data.musculoSkeletalProblemDetails || ''} onChange={v => updateField('musculoSkeletalProblemDetails', v)} />}

              <RadioGroup label="67. Are there any abnormalities of the upper limbs?" value={data.upperLimbsAbnormality} onChange={v => updateField('upperLimbsAbnormality', v)} />
              {data.upperLimbsAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.upperLimbsAbnormalityDetails || ''} onChange={v => updateField('upperLimbsAbnormalityDetails', v)} />}

              <RadioGroup label="68. Are there any abnormalities of the lower limbs?" value={data.lowerLimbsAbnormality} onChange={v => updateField('lowerLimbsAbnormality', v)} />
              {data.lowerLimbsAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.lowerLimbsAbnormalityDetails || ''} onChange={v => updateField('lowerLimbsAbnormalityDetails', v)} />}
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-slate-800">Nervous System & Psychiatric</h4>
              <RadioGroup label="69. Central Nervous System: Are there signs of disease (abnormal tendon or plantar reflexes)?" value={data.centralNervousSystemAbnormality} onChange={v => updateField('centralNervousSystemAbnormality', v)} />
              {data.centralNervousSystemAbnormality === 'Yes' && <TextArea label="Please provide details" value={data.centralNervousSystemAbnormalityDetails || ''} onChange={v => updateField('centralNervousSystemAbnormalityDetails', v)} />}

              <RadioGroup label="70. Psychiatric: Is there anything to suggest a tendency to psychiatric disorders?" value={data.psychiatricTendency} onChange={v => updateField('psychiatricTendency', v)} />
              {data.psychiatricTendency === 'Yes' && <TextArea label="Please provide details" value={data.psychiatricTendencyDetails || ''} onChange={v => updateField('psychiatricTendencyDetails', v)} />}

              <RadioGroup label="71. Are there any tremors?" value={data.tremors} onChange={v => updateField('tremors', v)} />
              {data.tremors === 'Yes' && <TextArea label="Please provide details" value={data.tremorsDetails || ''} onChange={v => updateField('tremorsDetails', v)} />}

              <RadioGroup label="72. Are the pupils abnormal?" value={data.pupilsAbnormal} onChange={v => updateField('pupilsAbnormal', v)} />
              {data.pupilsAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.pupilsAbnormalDetails || ''} onChange={v => updateField('pupilsAbnormalDetails', v)} />}

              <RadioGroup label="73. Are the cranial nerves abnormal?" value={data.cranialNervesAbnormal} onChange={v => updateField('cranialNervesAbnormal', v)} />
              {data.cranialNervesAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.cranialNervesAbnormalDetails || ''} onChange={v => updateField('cranialNervesAbnormalDetails', v)} />}

              <RadioGroup label="74. Is there any abnormality of the reflexes?" value={data.reflexesAbnormal} onChange={v => updateField('reflexesAbnormal', v)} />
              {data.reflexesAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.reflexesAbnormalDetails || ''} onChange={v => updateField('reflexesAbnormalDetails', v)} />}

              <RadioGroup label="75. Is there any abnormality of the eyes?" value={data.eyesAbnormal} onChange={v => updateField('eyesAbnormal', v)} />
              {data.eyesAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.eyesAbnormalDetails || ''} onChange={v => updateField('eyesAbnormalDetails', v)} />}

              <RadioGroup label="76. Is there any abnormality of the ears?" value={data.earsAbnormal} onChange={v => updateField('earsAbnormal', v)} />
              {data.earsAbnormal === 'Yes' && <TextArea label="Please provide details" value={data.earsAbnormalDetails || ''} onChange={v => updateField('earsAbnormalDetails', v)} />}
            </div>
          </div>
        );

      case FormStep.LABS:
        const levels = [{ label: 'NAD', value: 'NAD' }, { label: 'Trace', value: 'Trace' }, { label: '+', value: '+' }, { label: '++', value: '++' }, { label: '+++', value: '+++' }];
        return (
          <div className="space-y-6">
            <SectionHeader title="Urinalysis & Lab Tests" subtitle="Fluid testing results" />
            <div className="space-y-8">
              <RadioGroup label="77. Urinalysis Results: Protein" value={data.protein} onChange={v => updateField('protein', v)} options={levels} />
              {data.protein !== '' && data.protein !== 'NAD' && <TextArea label="Please provide details on Protein result" value={data.proteinDetails || ''} onChange={v => updateField('proteinDetails', v)} />}

              <RadioGroup label="78. Urinalysis Results: Blood" value={data.blood} onChange={v => updateField('blood', v)} options={levels} />
              {data.blood !== '' && data.blood !== 'NAD' && <TextArea label="Please provide details on Blood result" value={data.bloodDetails || ''} onChange={v => updateField('bloodDetails', v)} />}

              <RadioGroup label="79. Urinalysis Results: Sugar" value={data.sugar} onChange={v => updateField('sugar', v)} options={levels} />
              {data.sugar !== '' && data.sugar !== 'NAD' && <TextArea label="Please provide details on Sugar result" value={data.sugarDetails || ''} onChange={v => updateField('sugarDetails', v)} />}
            </div>

            <div className="pt-8 space-y-4">
              <RadioGroup label="80. Do you have any reason to suspect the sample provided may not belong to the customer?" value={data.suspectSample} onChange={v => updateField('suspectSample', v)} />
              {data.suspectSample === 'Yes' && <TextArea label="Please provide details" value={data.suspectSampleDetails || ''} onChange={v => updateField('suspectSampleDetails', v)} />}

              <RadioGroup label="81. Is the sample being sent to the laboratory (e.g. for MSU/UMIC)?" value={data.sentToLab} onChange={v => updateField('sentToLab', v)} />
              {data.sentToLab === 'No' && <TextArea label="If the urine was positive and no sample sent, please indicate why" value={data.noSampleReason || ''} onChange={v => updateField('noSampleReason', v)} />}

              <RadioGroup label="82. Cotinine Test Result" value={data.cotinineTest} onChange={v => updateField('cotinineTest', v)} options={[{ label: 'Positive', value: 'Positive' }, { label: 'Negative', value: 'Negative' }]} />
              {data.cotinineTest === 'Positive' && <TextArea label="Please provide details on Cotinine positive result" value={data.cotinineTestDetails || ''} onChange={v => updateField('cotinineTestDetails', v)} />}
            </div>
          </div>
        );

      case FormStep.REVIEW:
        return (
          <div className="space-y-6">
            <SectionHeader title="Final Review & Checklist" subtitle="Confirmation and final submission" />
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
              <h4 className="text-blue-800 font-bold mb-4 flex items-center gap-2"><FileText size={20} /> Submission Requirements</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={data.checklistFullyAnswered} onChange={e => updateField('checklistFullyAnswered', e.target.checked)} className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"/>
                  <span className="text-slate-700 group-hover:text-blue-700 transition-colors">Have every question been fully answered with supplementary responses for "Yes" answers?</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={data.checklistSigned} onChange={e => updateField('checklistSigned', e.target.checked)} className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"/>
                  <span className="text-slate-700 group-hover:text-blue-700 transition-colors">Has the report been signed by both parties and additional tests completed?</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={data.checklistBloodTaken} onChange={e => updateField('checklistBloodTaken', e.target.checked)} className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"/>
                  <span className="text-slate-700 group-hover:text-blue-700 transition-colors">Was a blood sample taken and sent to the lab?</span>
                </label>
              </div>
            </div>
            <TextArea label="Examiner Comments: Is there anything which calls for further clarification, or have you advised the customer to see their GP?" value={data.examinerComments} onChange={v => updateField('examinerComments', v)} />
            <TextArea label="Blood Sample Comments: Were there difficulties obtaining a sample (pain, haematoma, etc.)?" value={data.bloodSampleComments} onChange={v => updateField('bloodSampleComments', v)} />
            <div className="bg-white border border-slate-200 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded-lg"><span className="font-semibold">Height/Weight:</span> {data.height}cm / {data.weight}kg</div>
                <div className="p-3 bg-slate-50 rounded-lg"><span className="font-semibold">BP (Reading 1):</span> {data.bpReading1 || 'N/A'}</div>
                <div className="p-3 bg-slate-50 rounded-lg"><span className="font-semibold">Smoker:</span> {data.smoker || 'N/A'}</div>
                <div className="p-3 bg-slate-50 rounded-lg"><span className="font-semibold">Cotinine:</span> {data.cotinineTest || 'N/A'}</div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Side Navigation Bar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
            <span className="font-bold text-slate-800 tracking-tight text-xl">INUVI</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Digital Intake Portal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  <step.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? 'text-blue-700' : 'text-slate-600'}`}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {isActive ? 'Current Section' : isCompleted ? 'Completed' : 'Upcoming'}
                  </p>
                </div>
                {isCompleted && <CheckCircle2 size={14} className="text-green-500" />}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">Medical Examiner</p>
              <p className="text-xs text-slate-500 truncate">inuvi-portal-v1</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-700 transition-all shadow-sm">
            <Save size={16} /> Save Draft
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen pb-24">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
            <span className="font-bold text-slate-800 tracking-tight">INUVI</span>
          </div>
          <div className="text-xs font-bold text-blue-600 uppercase">
            Step {currentStep + 1} / {STEPS.length}
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-24 lg:pt-12 px-4 md:px-8">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 min-h-[600px] border border-slate-100">
            {renderStep()}
          </div>
        </div>

        {/* Floating Navigation Controls */}
        <div className="fixed bottom-0 left-0 lg:left-72 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-4 z-40">
          <div className="max-w-4xl mx-auto px-4 md:px-8 flex justify-between items-center">
            <button 
              onClick={prevStep} 
              disabled={currentStep === FormStep.COVID} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                currentStep === FormStep.COVID 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100 active:scale-95'
              }`}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            <div className="hidden sm:block">
              <div className="flex gap-1.5">
                {STEPS.map((s) => (
                  <div 
                    key={s.id} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentStep === s.id ? 'w-8 bg-blue-600' : currentStep > s.id ? 'w-4 bg-green-500' : 'w-4 bg-slate-200'
                    }`} 
                  />
                ))}
              </div>
            </div>

            {currentStep === FormStep.REVIEW ? (
              <button 
                onClick={() => alert('Submitted to Inuvi!')} 
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all flex items-center gap-2 active:scale-95"
              >
                Final Submit <CheckCircle2 size={20} />
              </button>
            ) : (
              <button 
                onClick={nextStep} 
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
              >
                Next Section <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
