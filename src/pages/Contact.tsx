import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Linkedin, CheckCircle2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});
  const { t, language } = useLanguage();

  const validate = (name: string, email: string, message: string) => {
    const newErrors: {name?: string, email?: string, message?: string} = {};
    if (!name.trim()) newErrors.name = t("Imię i nazwisko jest wymagane", "Name is required");
    if (!email.trim()) {
      newErrors.email = t("Email jest wymagany", "Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("Niepoprawny format adresu email", "Invalid email format");
    }
    if (!message.trim()) newErrors.message = t("Wiadomość jest wymagana", "Message is required");
    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(formData.name, formData.email, formData.message));
  }, [formData, language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all as touched on submit
    setTouched({ name: true, email: true, message: true });

    const validationErrors = validate(formData.name, formData.email, formData.message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subjectPrefix = language === 'pl' ? 'Nowa wiadomość od: ' : 'New message from: ';
    const namePrefix = language === 'pl' ? 'Imię i nazwisko: ' : 'Name: ';
    const emailPrefix = language === 'pl' ? 'Email: ' : 'Email: ';
    const messagePrefix = language === 'pl' ? 'Wiadomość:\n' : 'Message:\n';

    const subject = encodeURIComponent(`${subjectPrefix}${formData.name}`);
    const body = encodeURIComponent(`${namePrefix}${formData.name}\n${emailPrefix}${formData.email}\n\n${messagePrefix}${formData.message}`);
    
    window.location.href = `mailto:brief@luzno.agency?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
    
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-[100dvh] text-white pt-32 pb-24 px-6 sm:px-8 md:px-16 lg:px-24 flex flex-col"
    >
      <SEO 
        title="Kontakt | Luźno Agency - Porozmawiajmy o Twoim Projekcie"
        description="Skontaktuj się z nami. Jesteśmy gotowi, aby pomóc Twojej marce osiągnąć sukces w digitalu i social mediach."
      />
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-white/30" />
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/50">{t('Kontakt', 'Contact')}</span>
        </div>
        <h1 className="text-[clamp(3.5rem,14vw,9rem)] sm:text-[12vw] md:text-8xl lg:text-[9vw] leading-[0.85] font-black tracking-tighter uppercase text-white">
          {t('Napisz', 'Write')}<br />{t('do nas', 'to us')}
        </h1>
      </div>

      {/* Form & Socials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 flex-1">
        
        {/* Form */}
        <div className="lg:col-span-7 xl:col-span-6 relative">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-start gap-6 bg-white/5 border border-white/10 p-8 md:p-12"
                role="alert"
                aria-live="polite"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-light mb-2">{t('Dziękujemy za wiadomość!', 'Thank you for your message!')}</h3>
                  <p className="text-white/60 font-light leading-relaxed">
                    {t('Twój klient poczty został otwarty. Wyślij przygotowaną wiadomość, a my odpowiemy najszybciej jak to możliwe.', 'Your email client has been opened. Send the prepared message, and we will reply as soon as possible.')}
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-sm font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm"
                >
                  {t('Wyślij kolejną wiadomość', 'Send another message')}
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8" 
                onSubmit={handleSubmit}
                noValidate
                aria-label={t("Formularz kontaktowy", "Contact form")}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-white/50 uppercase tracking-widest">{t('Imię i nazwisko', 'Name')}</label>
                  <input 
                    id="name"
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                    className={`bg-transparent border-b pb-4 text-xl focus:outline-none transition-all duration-300 rounded-none w-full hover:border-white/60 focus:border-white ${touched.name && errors.name ? 'border-red-500 text-red-100' : 'border-white/20 text-white'}`} 
                    required 
                    aria-required="true"
                  />
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        id="name-error" 
                        className="text-red-500 text-sm mt-1" 
                        role="alert"
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-white/50 uppercase tracking-widest">{t('Email', 'Email')}</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                    className={`bg-transparent border-b pb-4 text-xl focus:outline-none transition-all duration-300 rounded-none w-full hover:border-white/60 focus:border-white ${touched.email && errors.email ? 'border-red-500 text-red-100' : 'border-white/20 text-white'}`} 
                    required 
                    aria-required="true"
                  />
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        id="email-error" 
                        className="text-red-500 text-sm mt-1" 
                        role="alert"
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono text-white/50 uppercase tracking-widest">{t('Wiadomość', 'Message')}</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                    className={`bg-transparent border-b pb-4 text-xl focus:outline-none transition-all duration-300 resize-none rounded-none w-full hover:border-white/60 focus:border-white ${touched.message && errors.message ? 'border-red-500 text-red-100' : 'border-white/20 text-white'}`} 
                    required
                    aria-required="true"
                  ></textarea>
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        id="message-error" 
                        className="text-red-500 text-sm mt-1" 
                        role="alert"
                      >
                        {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                <button 
                  type="submit" 
                  disabled={Object.keys(errors).length > 0}
                  className="group flex items-center gap-4 self-start mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-full pr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t("Wyślij wiadomość", "Send message")}
                >
                  <span className="text-lg uppercase tracking-widest font-medium">{t('Wyślij', 'Send')}</span>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-focus-visible:bg-white group-focus-visible:text-black">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Socials & Info */}
        <div className="lg:col-span-5 xl:col-span-4 lg:col-start-9 flex flex-col gap-16 lg:pl-12 lg:border-l border-white/10">
          <div>
            <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-white/20"></span>
              Social Media
            </h3>
            <div className="flex flex-col gap-6">
              <a href="https://www.linkedin.com/company/lu%C5%BAno-digital-branding/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-xl hover:translate-x-2 transition-transform duration-300 w-fit">
                <Linkedin className="w-6 h-6" /> 
                <span className="font-light">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-white/20"></span>
              {t('Dane kontaktowe', 'Contact details')}
            </h3>
            <div className="flex flex-col gap-4 font-light">
              <a href="mailto:brief@luzno.agency" className="text-xl hover:text-white/70 transition-colors w-fit">
                brief@luzno.agency
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.main>
  );
}
