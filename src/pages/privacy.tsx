import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg mb-12">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, subscribe to our newsletter, or
                  contact us for support.
                </p>
                <p>
                  This may include your name, email address, and any other
                  information you choose to provide.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you updates and marketing communications</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns and trends</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Information Sharing
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this policy.
                </p>
                <p>
                  We may share your information with trusted service providers
                  who assist us in operating our website and conducting our
                  business.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Data Security
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
                <p>
                  However, no method of transmission over the internet is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Cookies
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. Cookies help us understand how
                  you use our site and improve our services.
                </p>
                <p>
                  You can control cookie settings through your browser
                  preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have any questions about this privacy policy, please
                  contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900">Email:</p>
                  <p className="text-gray-700">privacy@yoursite.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Privacy;
