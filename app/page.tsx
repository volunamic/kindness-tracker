import KindnessTracker from "@/components/kindness-tracker"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <KindnessTracker />
    </main>
  )
}
