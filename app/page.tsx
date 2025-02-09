/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Image from "next/image";
import { Wifi, Utensils, Dumbbell, SpadeIcon as Spa } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";
import PartnerLogos from "@/components/Partners";
import {  useEffect, useState } from "react";
import Footer from "@/components/modules/mainpage/footer";
import Header from "@/components/modules/mainpage/header";

export default function Home() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://679f90c424322f8329c40a52.mockapi.io/api/reservations"
      );
      const data = await response.json();
      setReservations(data);
    };
    fetchData();
  }, []);
        
  // console.log(JSON.parse(session),"session");
  return (
    <div className="min-h-screen flex flex-col">
      <Header reservationsCount={reservations.length} />
      {/* Hero Section */}
      <section className="relative flex-grow">
        <div className="absolute inset-0">
          <Image
            src="/receptionists-elegant-suits-work-hours.jpg"
            alt="Hotel Reception"
            layout="fill"
            objectFit="cover"
            priority
            className="brightness-[0.75]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Discover Your Perfect Stay
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12">
              Unbeatable deals from over 100 top hotel sites
            </p>

            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-lg">
              <ReservationForm setReservations={setReservations} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Experience Luxury and Comfort
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wifi,
                title: "Free High-Speed WiFi",
                description:
                  "Stay connected with complimentary high-speed internet access throughout your stay.",
              },
              {
                icon: Utensils,
                title: "Gourmet Dining",
                description:
                  "Indulge in exquisite culinary experiences at our world-class restaurants.",
              },
              {
                icon: Dumbbell,
                title: "State-of-the-Art Fitness Center",
                description:
                  "Maintain your fitness routine with our modern gym equipment and facilities.",
              },
              {
                icon: Spa,
                title: "Luxurious Spa Services",
                description:
                  "Relax and rejuvenate with our range of premium spa treatments and therapies.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105"
              >
                <service.icon className="text-primary mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/1.jpg",
                title: "Paris",
                description: "Experience the city of love",
              },
              {
                image: "/2.jpg",
                title: "New York",
                description: "Discover the city that never sleeps",
              },
              {
                image: "/receptionists-elegant-suits-work-hours.jpg",
                title: "Tokyo",
                description: "Immerse yourself in Japanese culture",
              },
            ].map((destination, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg group"
              >
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-sm">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerLogos />
      <Footer />
    </div>
  );
}
