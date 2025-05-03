"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Sun, Palette, RotateCcw } from "lucide-react"

export default function PlatformTheme() {
  const [colorScheme, setColorScheme] = useState("default")
  const [primaryColor, setPrimaryColor] = useState("#0f172a")
  const [secondaryColor, setSecondaryColor] = useState("#64748b")
  const [accentColor, setAccentColor] = useState("#2563eb")
  const [fontFamily, setFontFamily] = useState("inter")
  const [darkMode, setDarkMode] = useState("system")
  const [borderRadius, setBorderRadius] = useState("medium")
  const [customCss, setCustomCss] = useState("")
  const [layoutDensity, setLayoutDensity] = useState("comfortable")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
          <CardDescription>Customize the color scheme of your platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color-scheme">Predefined Color Schemes</Label>
            <Select value={colorScheme} onValueChange={setColorScheme}>
              <SelectTrigger id="color-scheme">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="vibrant">Vibrant</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={colorScheme === "custom" ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: primaryColor }}></div>
                  <Input
                    id="primary-color"
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: secondaryColor }}></div>
                  <Input
                    id="secondary-color"
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: accentColor }}></div>
                  <Input
                    id="accent-color"
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Open Color Picker
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Customize the fonts and text appearance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger id="font-family">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="open-sans">Open Sans</SelectItem>
                <SelectItem value="lato">Lato</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Preview</Label>
            <div className={`p-4 border rounded-md space-y-2 font-${fontFamily}`}>
              <h1 className="text-2xl font-bold">Heading 1</h1>
              <h2 className="text-xl font-semibold">Heading 2</h2>
              <p className="text-base">
                This is a paragraph of text that demonstrates how your selected font will appear throughout the
                platform. It includes <strong>bold text</strong>, <em>italic text</em>, and{" "}
                <a href="#" className="text-primary">
                  links
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Configure the visual appearance of your platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Dark Mode</Label>
            <RadioGroup value={darkMode} onValueChange={setDarkMode} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light-mode" />
                <Label htmlFor="light-mode" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark-mode" />
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system-mode" />
                <Label htmlFor="system-mode">System</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Border Radius</Label>
            <RadioGroup value={borderRadius} onValueChange={setBorderRadius} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="radius-none" />
                <Label htmlFor="radius-none">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="radius-small" />
                <Label htmlFor="radius-small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="radius-medium" />
                <Label htmlFor="radius-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="radius-large" />
                <Label htmlFor="radius-large">Large</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Layout Density</Label>
            <RadioGroup value={layoutDensity} onValueChange={setLayoutDensity} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="density-compact" />
                <Label htmlFor="density-compact">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="density-comfortable" />
                <Label htmlFor="density-comfortable">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spacious" id="density-spacious" />
                <Label htmlFor="density-spacious">Spacious</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Customization</CardTitle>
          <CardDescription>Add custom CSS to further customize your platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-css">Custom CSS</Label>
            <textarea
              id="custom-css"
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              className="w-full min-h-[200px] font-mono text-sm p-4 rounded-md border border-input bg-transparent"
              placeholder="/* Add your custom CSS here */
.custom-class {
  color: #ff0000;
}"
            />
            <p className="text-sm text-muted-foreground">
              Custom CSS will be applied to the entire platform. Use with caution.
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RotateCcw className="h-3 w-3" />
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
          <CardDescription>Preview how your theme will look across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="components" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>
            <TabsContent value="components" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Buttons</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Form Elements</Label>
                  <div className="space-y-2">
                    <Input placeholder="Input field" />
                    <div className="flex items-center space-x-2">
                      <Switch id="preview-switch" />
                      <Label htmlFor="preview-switch">Switch</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="dashboard" className="mt-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Dashboard Preview</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button size="sm">Action</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Metric {i}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{i * 1234}</div>
                        <p className="text-xs text-muted-foreground">+{i * 5.2}% from last month</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="border rounded-md">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold">Recent Activity</h4>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Activity Item {i}</p>
                          <p className="text-sm text-muted-foreground">Description for activity {i}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="forms" className="mt-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preview-name">Name</Label>
                      <Input id="preview-name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preview-email">Email</Label>
                      <Input id="preview-email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preview-message">Message</Label>
                    <textarea
                      id="preview-message"
                      className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent"
                      placeholder="Enter your message"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="preview-terms" />
                    <Label htmlFor="preview-terms">I agree to the terms and conditions</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}
