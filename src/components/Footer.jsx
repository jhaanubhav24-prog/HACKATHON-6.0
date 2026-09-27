export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <span className="font-display text-lg text-white">STRIKE</span>
          <p className="mt-3 max-w-xs text-sm text-gray-500">
            Empowering developers with cutting-edge tools and resources. Powered by Coder Army,
            Strike is your gateway to a world of endless coding with guided lessons, real
            projects, level up your skills.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-strike-green">Platform</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Home</li>
            <li>Practice</li>
            <li>DSA Sheet</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-strike-green">Company</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-strike-green">Legal</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-border pt-6 text-xs text-gray-600">
        <span>© 2025 STRIKE. All rights reserved.</span>
        <span>Made for a hiring assignment · not affiliated with the real Strike</span>
      </div>
    </footer>
  )
}
