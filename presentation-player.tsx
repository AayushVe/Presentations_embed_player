"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, Pause, Play } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PresentationPlayer() {
  const [url, setUrl] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isEmbedded, setIsEmbedded] = useState(false)
  const totalSlides = 5 // Mock total slides

  // Mock slides for demonstration
  const slides = [
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
  ]

  const handleEmbed = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      setIsEmbedded(true)
    }
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!isEmbedded ? (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleEmbed} className="space-y-4">
              <h2 className="text-xl font-semibold">Embed a Presentation</h2>
              <p className="text-sm text-muted-foreground">Enter the URL of your presentation to embed and play it</p>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/my-presentation"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Embed</Button>
              </div>
              <Tabs defaultValue="supported">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="supported">Supported Formats</TabsTrigger>
                  <TabsTrigger value="recent">Recent Presentations</TabsTrigger>
                </TabsList>
                <TabsContent value="supported" className="space-y-4 pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-xs">G</span>
                      </div>
                      Google Slides
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-xs">P</span>
                      </div>
                      PowerPoint Online
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 text-xs">K</span>
                      </div>
                      Keynote (shared links)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 text-xs">S</span>
                      </div>
                      SlideShare
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="recent" className="space-y-4 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Company Overview Q2</div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Product Roadmap 2025</div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Marketing Strategy</div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{url.length > 40 ? url.substring(0, 40) + "..." : url}</h2>
              <p className="text-sm text-muted-foreground">
                Slide {currentSlide} of {totalSlides}
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsEmbedded(false)}>
              Change Presentation
            </Button>
          </div>

          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <Image
              src={slides[currentSlide - 1] || "/placeholder.svg"}
              alt={`Slide ${currentSlide}`}
              fill
              className="object-contain"
              priority
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <div className="text-sm font-medium">
                    {currentSlide}/{totalSlides}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    disabled={currentSlide === 1}
                    className="text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides}
                    className="text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Maximize2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mt-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`aspect-video rounded-md overflow-hidden border-2 cursor-pointer ${
                  currentSlide === index + 1 ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentSlide(index + 1)}
              >
                <Image
                  src={slide || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={240}
                  height={135}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

