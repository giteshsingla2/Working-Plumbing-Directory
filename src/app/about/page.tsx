import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BuildingOffice2Icon, HandRaisedIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About Us | Find Local Plumbing Services",
  description: "Learn about our mission to connect homeowners with trusted local plumbing professionals across California.",
};

const values = [
  {
    name: "Trust & Reliability",
    description: "We verify all service providers to ensure they are licensed, insured, and maintain high service standards.",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Customer First",
    description: "Our platform is designed with your needs in mind, making it easy to find and connect with the right professionals.",
    icon: UserGroupIcon,
  },
  {
    name: "Community Focus",
    description: "We support local businesses and help strengthen communities by facilitating trusted service connections.",
    icon: HandRaisedIcon,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="About Us"
        description="Connecting homeowners with trusted local plumbing professionals"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-500">
              We're on a mission to transform how homeowners find and connect with plumbing professionals. 
              By providing a trusted platform for service discovery, we make it easier for you to find reliable 
              plumbing services when you need them most.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Values</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              These core values guide everything we do as we work to provide the best service to our users.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <value.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">{value.name}</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
