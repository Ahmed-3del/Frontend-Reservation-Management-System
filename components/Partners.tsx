export default function PartnerLogos() {
    const partners = ["Booking.com", "Hotels.com", "Expedia", "Agoda", "HomeAway", "All.com", "Trip.com"]
    return (
        <div className="container bg-gray-900 text-white py-6 mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8">
                {partners.map((partner) => (
                    <div key={partner} className=" text-sm font-medium whitespace-nowrap">
                        {partner}
                    </div>
                ))}
                <div className=" text-sm">+100 more</div>
            </div>
        </div>
    )
}

