import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Find Local Plumbing Services",
  description: "Learn about how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Privacy Policy"
        description="Last updated: December 2023"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            We are committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul>
            <li>Search for plumbing services</li>
            <li>Contact service providers through our platform</li>
            <li>Create an account</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us for support</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Connect you with service providers</li>
            <li>Send you updates and marketing communications</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Service providers you choose to connect with</li>
            <li>Third-party service providers who assist in operating our website</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@example.com</li>
            <li>Phone: +1 (888) 123-4567</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
