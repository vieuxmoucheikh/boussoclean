export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 w-3/4 mx-auto bg-green-500 animate-pulse rounded-md mb-6"></div>
          <div className="h-6 w-1/2 mx-auto bg-green-500 animate-pulse rounded-md"></div>
        </div>
      </section>

      {/* Featured Services Section Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="h-8 w-1/3 mx-auto bg-gray-200 animate-pulse rounded-md mb-12"></div>
          
          {/* Service Card Skeleton */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full mb-4"></div>
                <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded-md mb-6"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded-md mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </div>
              <div className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
          
          {/* Second Service Card Skeleton */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 h-80 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="order-1 md:order-2">
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full mb-4"></div>
                <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded-md mb-6"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded-md mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-8 w-1/3 mx-auto bg-gray-300 animate-pulse rounded-md mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="h-8 w-1/2 mx-auto bg-gray-200 animate-pulse rounded-md mb-4"></div>
          <div className="h-6 w-2/3 mx-auto bg-gray-200 animate-pulse rounded-md mb-8"></div>
          <div className="h-12 w-40 mx-auto bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </section>
    </div>
  );
}
