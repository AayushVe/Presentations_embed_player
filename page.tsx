import { PresentationPlayer } from "@/components/presentation-player"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Presentation Player</h1>
      <p className="text-center text-muted-foreground mb-10">Embed and play your presentations from anywhere</p>
      <PresentationPlayer />
    </div>
  )
}

