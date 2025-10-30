import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';

const slides = [
    {
        image: "url('https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1925&auto=format&fit=crop')",
        title: "Total Device Protection, Simplified for You",
        subtitle: "With Misafe, extend the life of your gadgets with hassle-free warranty and repair plans."
    },
    {
        image: "url('https://images.unsplash.com/photo-1604241551699-e65942bff432?q=80&w=1974&auto=format&fit=crop')",
        title: "Oops-Proof Your Gadgets From Mishaps",
        subtitle: "Our accidental damage plans cover drops, spills, and cracks, so you can live worry-free."
    },
    {
        image: "url('https://images.unsplash.com/photo-1629390235125-1e3387b64996?q=80&w=2070&auto=format&fit=crop')",
        title: "Fast, Reliable Repairs When You Need Them",
        subtitle: "Experience quick and professional service from our network of certified technicians."
    }
];

// Hero Section Carousel
const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    useEffect(() => {
        const slider = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slider);
    }, [nextSlide]);


    return (
        <div className="relative h-[350px] w-full overflow-hidden">
            <div className="relative h-full">
                {/* Slides */}
                {slides.map((slide, index) => (
                     <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="h-full bg-cover bg-center" style={{ backgroundImage: slide.image }}>
                             <div className="absolute inset-0 bg-black/50"></div>
                             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0s' }}>{slide.title}</h1>
                                <p className="mt-4 text-md md:text-lg max-w-2xl animate-fade-in-up animation-delay-300 opacity-0">{slide.subtitle}</p>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Left Arrow */}
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            {/* Right Arrow */}
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'}`}></button>
                ))}
            </div>
        </div>
    );
};


// Statistics Section
const stats = [
    { value: '500+', label: 'Brands Covered' },
    { value: '10,000+', label: 'Pin Codes Served' },
    { value: '99%', label: 'Happy Customers' },
    { value: '8 Lakh+', label: 'Claims Covered' }
];

const StatsSection = () => (
    <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-4xl md:text-5xl font-bold text-blue-600">{stat.value}</p>
                        <p className="mt-2 text-sm md:text-base text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


// Why Choose Us Section
const whyChooseUsItems = [
    { 
        title: 'Apparent Failures', 
        description: 'Don\'t let unexpected breakdowns disrupt your life. We cover a wide range of device failures.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14M19.07 4.93l-14.14 14.14" />
            </svg>
        )
    },
    { 
        title: 'High Repair Costs', 
        description: 'Avoid hefty, unexpected repair bills. Our plans offer affordable, fixed-cost solutions.',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9.5C17 8.12 14.314 7 12 7S7 8.12 7 9.5 9.686 12 12 12s5-1.12 5-2.5zM12 12v6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5c-2.314 0-5-.88-5-2.25S9.686 13 12 13s5 .88 5 2.25-2.686 2.25-5 2.25z" />
            </svg>
        ) 
    },
    { 
        title: 'Lack of Qualified Technicians', 
        description: 'Get access to our network of certified and experienced technicians for quality repairs.',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    }
];

const WhyChooseUsSection = () => (
    <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">An Optimized Future for Your Devices</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Device protection plans are no longer a luxury, but a necessity. Here's why.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-10">
                    {whyChooseUsItems.map(item => (
                        <div key={item.title} className="flex items-start space-x-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                <p className="mt-2 text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative h-96">
                     <img src="https://images.unsplash.com/photo-1596008177353-8d057356c126?q=80&w=1887&auto=format&fit=crop" alt="Protected devices" className="w-full h-full object-cover rounded-2xl shadow-xl"/>
                     <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 rounded-lg -z-10 opacity-20 transform rotate-12"></div>
                      <div className="absolute -top-4 -left-4 w-32 h-32 bg-pink-500 rounded-full -z-10 opacity-20"></div>
                </div>
            </div>
        </div>
    </section>
);


// Extend Life Section
const gadgets = [ { name: 'Mobiles' }, { name: 'Laptops' }, { name: 'Televisions' }, { name: 'Appliances' }];
const ExtendLifeSection = () => (
     <section className="py-20 bg-gradient-to-r from-blue-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl md:text-4xl font-bold">Extend the Life of Your Gadgets & Appliances</h2>
             <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">From smartphones to smart fridges, we've got you covered.</p>
             <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                 {gadgets.map(g => (
                     <div key={g.name} className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-xl font-semibold transform hover:scale-105 transition-transform duration-300">{g.name}</div>
                 ))}
             </div>
        </div>
     </section>
);


// Service Promises Section
const promises = [
    { title: 'Quality Repair', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Cashless Facility', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: 'Free Pick-up & Drop', icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { title: 'Zero Paperwork', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { title: '24/7 Support', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { title: 'Free At-Home Service', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }
];

const ServicePromisesSection = () => (
    <section className="py-20 px-4 container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Service Promises</h2>
            <p className="mt-4 text-lg text-gray-600">Our commitment to each other, and most importantly, to you.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promises.map(p => (
                <div key={p.title} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{p.title}</h3>
                        <p className="text-gray-600 text-sm">A promise of quality and convenience we always deliver.</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

// Hassle-Free Process Section
const ProcessSection = () => (
    <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hassle-Free Pre-Process</h2>
                <p className="mt-4 text-lg text-gray-600">Get your device protected in three simple steps.</p>
            </div>
            <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 hidden md:block" style={{transform: 'translateY(-50%)'}}></div>
                 <div className="flex-1 text-center p-4">
                     <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 border-4 border-slate-50">1</div>
                     <h3 className="font-bold text-gray-800">Register Your Device</h3>
                 </div>
                 <div className="flex-1 text-center p-4">
                     <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 border-4 border-slate-50">2</div>
                     <h3 className="font-bold text-gray-800">Team Verification</h3>
                 </div>
                 <div className="flex-1 text-center p-4">
                     <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 border-4 border-slate-50">3</div>
                     <h3 className="font-bold text-gray-800">Get Approved</h3>
                 </div>
            </div>
        </div>
    </section>
);

// Testimonials Section
const TestimonialsSection = () => (
     <section className="py-20 px-4 container mx-auto">
        <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
                <p className="text-gray-600">"The process was incredibly smooth. My laptop was repaired and returned within 2 days. Highly recommended!"</p>
                <p className="mt-4 font-bold text-gray-800">- Sarah J.</p>
            </Card>
             <Card className="p-8">
                <p className="text-gray-600">"Misafe saved me from a huge repair bill on my phone. Their premium plan is worth every penny."</p>
                <p className="mt-4 font-bold text-gray-800">- Michael B.</p>
            </Card>
             <Card className="p-8">
                <p className="text-gray-600">"Customer support was fantastic. They guided me through the entire claim process patiently."</p>
                <p className="mt-4 font-bold text-gray-800">- Emily R.</p>
            </Card>
        </div>
     </section>
);

// Trusted By Section
const BrandsSection = () => {
    const brands = ["Apple", "Samsung", "Dell", "HP", "Sony", "LG", "Lenovo", "Asus"];
    const logos = [...brands, ...brands]; // Duplicate for infinite scroll effect

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-2xl font-bold text-gray-500 mb-8">Trusted By Major Brands</h2>
                <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <div className="flex w-max animate-infinite-scroll">
                        {logos.map((brand, index) => (
                             <div key={index} className="flex items-center justify-center w-52 h-20 mx-4">
                                <span className="text-2xl text-gray-400 font-semibold">{brand}</span>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const Home: React.FC = () => {
    return (
        <div>
            <HeroCarousel />
            <StatsSection />
            <WhyChooseUsSection />
            <ExtendLifeSection />
            <ServicePromisesSection />
            <ProcessSection />
            <TestimonialsSection />
            <BrandsSection />
        </div>
    );
};

export default Home;