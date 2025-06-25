import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Terms and Conditions
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
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  By accessing and using this website, you accept and agree to
                  be bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use
                  this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Use License
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials on our website for personal, non-commercial
                  transitory viewing only.
                </p>
                <p>
                  This is the grant of a license, not a transfer of title, and
                  under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>modify or copy the materials</li>
                  <li>
                    use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    attempt to reverse engineer any software contained on the
                    website
                  </li>
                  <li>
                    remove any copyright or other proprietary notations from the
                    materials
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Prohibited Content
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  As a platform dedicated to the preservation and celebration of
                  culture, we strictly prohibit the upload, posting, or sharing
                  of any content that includes hate speech, discriminatory
                  remarks, or incites violence based on race, ethnicity,
                  nationality, religion, gender, sexual orientation, age, or
                  disability.
                </p>
                <p>
                  Users who violate this policy may have their content removed
                  and their accounts suspended or terminated without prior
                  notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Disclaimer
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The materials on our website are provided on an 'as is' basis.
                  We make no warranties, expressed or implied, and hereby
                  disclaim and negate all other warranties including without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
                <p>
                  Further, we do not warrant or make any representations
                  concerning the accuracy, likely results, or reliability of the
                  use of the materials on its website or otherwise relating to
                  such materials or on any sites linked to this site.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Limitations
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  In no event shall our company or its suppliers be liable for
                  any damages (including, without limitation, damages for loss
                  of data or profit, or due to business interruption) arising
                  out of the use or inability to use the materials on our
                  website.
                </p>
                <p>
                  Some jurisdictions do not allow limitations on implied
                  warranties, or limitations of liability for consequential or
                  incidental damages, these limitations may not apply to you.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Accuracy of Materials
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The materials appearing on our website could include
                  technical, typographical, or photographic errors. We do not
                  warrant that any of the materials on its website are accurate,
                  complete, or current.
                </p>
                <p>
                  We may make changes to the materials contained on its website
                  at any time without notice. However, we do not make any
                  commitment to update the materials.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Links</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We have not reviewed all of the sites linked to our website
                  and are not responsible for the contents of any such linked
                  site.
                </p>
                <p>
                  The inclusion of any link does not imply endorsement by us of
                  the site. Use of any such linked website is at the user's own
                  risk.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Modifications
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may revise these terms of service for its website at any
                  time without notice. By using this website, you are agreeing
                  to be bound by the then current version of these terms of
                  service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Governing Law
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  These terms and conditions are governed by and construed in
                  accordance with the laws and you irrevocably submit to the
                  exclusive jurisdiction of the courts in that state or
                  location.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have any questions about these Terms and Conditions,
                  please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-medium text-gray-900">Email:</p>
                  <p className="text-gray-700">legal@yoursite.com</p>
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

export default Terms;
