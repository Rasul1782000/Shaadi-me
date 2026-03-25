import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Upload, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface IntakeFormProps {
  onClose: () => void;
}

const STEPS = [
  { id: 'names', title: 'Tell us who is getting married' },
  { id: 'phone', title: 'How can we reach you?' },
  { id: 'date', title: 'When is the big day?' },
  { id: 'budget', title: 'What is your planned budget?' },
  { id: 'type', title: 'What kind of wedding is it?' },
  { id: 'guests', title: 'How many guests are you expecting?' },
  { id: 'preference', title: 'How involved do you want to be?' },
  { id: 'inspiration', title: 'Share your inspiration' },
  { id: 'city', title: 'Which city are you planning in?' }
];

export default function IntakeForm({ onClose }: IntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    phone: '',
    date: '',
    budget: '',
    type: '',
    guests: '',
    preference: '',
    city: ''
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b1248]/90 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 text-[#ff5757]" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-serif text-[#4b1248] mb-4">Congratulations, {formData.brideName} & {formData.groomName}!</h2>
          <p className="text-gray-600 mb-8">Thank you for choosing ShaadiMe. We are going to take care of everything. Enjoy the process.</p>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#ff5757] text-white rounded-full font-medium hover:bg-[#ff5757]/90 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b1248]/80 backdrop-blur-sm p-4">
      <div className="bg-[#fdf6f3] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 w-full">
          <motion.div 
            className="h-full bg-[#ff5757]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-6 h-6 rotate-180" />
        </button>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="min-h-[300px] flex flex-col justify-center"
            >
              <span className="text-[#ff5757] font-medium mb-2">Step {currentStep + 1} of {STEPS.length}</span>
              <h2 className="text-3xl font-serif text-[#4b1248] mb-8">{STEPS[currentStep].title}</h2>

              {currentStep === 0 && (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Bride's First Name"
                    className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#fad6d6] outline-none transition-colors"
                    value={formData.brideName}
                    onChange={e => setFormData({...formData, brideName: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Groom's First Name"
                    className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#fad6d6] outline-none transition-colors"
                    value={formData.groomName}
                    onChange={e => setFormData({...formData, groomName: e.target.value})}
                  />
                </div>
              )}

              {currentStep === 1 && (
                <input 
                  type="tel" 
                  placeholder="10-digit mobile number"
                  className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#fad6d6] outline-none transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <input 
                    type="date" 
                    className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#fad6d6] outline-none transition-colors"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                  <button 
                    onClick={() => setFormData({...formData, date: 'Not decided yet'})}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-colors text-left",
                      formData.date === 'Not decided yet' ? "border-[#ff5757] bg-[#ff5757]/5" : "border-gray-100"
                    )}
                  >
                    Not decided yet
                  </button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 gap-3">
                  {['Under 5 Lakh', '5 to 15 Lakh', '15 to 30 Lakh', '30 Lakh and above', 'Flexible'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setFormData({...formData, budget: opt})}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-colors text-left",
                        formData.budget === opt ? "border-[#ff5757] bg-[#ff5757]/5" : "border-gray-100"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 4 && (
                <div className="grid grid-cols-1 gap-3">
                  {['Arranged Marriage', 'Love Marriage'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setFormData({...formData, type: opt})}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-colors text-left",
                        formData.type === opt ? "border-[#ff5757] bg-[#ff5757]/5" : "border-gray-100"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 5 && (
                <div className="grid grid-cols-1 gap-3">
                  {['Under 100', '100 to 300', '300 to 600', '600 to 1000', 'Above 1000'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setFormData({...formData, guests: opt})}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-colors text-left",
                        formData.guests === opt ? "border-[#ff5757] bg-[#ff5757]/5" : "border-gray-100"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 6 && (
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "I want to be involved in every detail",
                    "I want to share my vision and let ShaadiMe handle the rest",
                    "Take care of everything, I trust ShaadiMe completely"
                  ].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setFormData({...formData, preference: opt})}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-colors text-left",
                        formData.preference === opt ? "border-[#ff5757] bg-[#ff5757]/5" : "border-gray-100"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 7 && (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                  <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Upload up to 10 photos (JPG, PNG, PDF)</p>
                  <input type="file" multiple className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="mt-4 inline-block px-6 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                    Browse Files
                  </label>
                </div>
              )}

              {currentStep === 8 && (
                <div className="grid grid-cols-1 gap-3">
                  {['Bengaluru', 'Chennai', 'Hyderabad'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setFormData({...formData, city: opt})}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-colors text-left",
                        formData.city === opt ? "border-[#ff5757] bg-[#ff5757]/5" : "border-gray-100"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-between items-center">
            <button 
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center text-gray-400 hover:text-[#4b1248] disabled:opacity-0 transition-all"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <button 
              onClick={handleNext}
              className="px-8 py-4 bg-[#ff5757] text-white rounded-full font-medium flex items-center hover:bg-[#ff5757]/90 transition-all shadow-lg shadow-[#ff5757]/20"
            >
              {currentStep === STEPS.length - 1 ? 'Finish' : 'Next Step'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
