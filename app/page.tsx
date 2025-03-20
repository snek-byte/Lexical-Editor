import Editor from "@/components/editor"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Editor />
      </div>
    </main>
  )
}

