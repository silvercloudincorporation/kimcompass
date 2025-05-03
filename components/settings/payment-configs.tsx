"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, DollarSign, Plus, Copy, Eye, EyeOff, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PaymentConfigs() {
  const [showTestKey, setShowTestKey] = useState(false)
  const [showLiveKey, setShowLiveKey] = useState(false)
  const [paymentMode, setPaymentMode] = useState("test")
  const [defaultCurrency, setDefaultCurrency] = useState("KES")
  const [enabledGateways, setEnabledGateways] = useState<string[]>(["mpesa", "card"])

  const toggleGateway = (gateway: string) => {
    if (enabledGateways.includes(gateway)) {
      setEnabledGateways(enabledGateways.filter((g) => g !== gateway))
    } else {
      setEnabledGateways([...enabledGateways, gateway])
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>Configure payment gateways and processing options.</CardDescription>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Gateway
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="payment-mode">Payment Mode</Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="test-mode" className={paymentMode === "test" ? "font-medium" : "text-muted-foreground"}>
                Test
              </Label>
              <Switch
                id="payment-mode"
                checked={paymentMode === "live"}
                onCheckedChange={(checked) => setPaymentMode(checked ? "live" : "test")}
              />
              <Label htmlFor="live-mode" className={paymentMode === "live" ? "font-medium" : "text-muted-foreground"}>
                Live
              </Label>
            </div>
          </div>

          {paymentMode === "test" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Test Mode Active</AlertTitle>
              <AlertDescription>
                Payments are being processed in test mode. No real transactions will occur.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="mpesa" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mpesa" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                M-Pesa
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card Payments
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mpesa" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mpesa-enabled">Enable M-Pesa</Label>
                  <p className="text-sm text-muted-foreground">Allow payments via M-Pesa mobile money.</p>
                </div>
                <Switch
                  id="mpesa-enabled"
                  checked={enabledGateways.includes("mpesa")}
                  onCheckedChange={() => toggleGateway("mpesa")}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-shortcode">Business Shortcode</Label>
                    <Input id="mpesa-shortcode" placeholder="e.g. 174379" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-passkey">Passkey</Label>
                    <div className="flex">
                      <Input
                        id="mpesa-passkey"
                        type={showTestKey ? "text" : "password"}
                        placeholder="Enter passkey"
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        className="rounded-l-none border-l-0"
                        onClick={() => setShowTestKey(!showTestKey)}
                      >
                        {showTestKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-consumer-key">Consumer Key</Label>
                    <Input id="mpesa-consumer-key" placeholder="Enter consumer key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-consumer-secret">Consumer Secret</Label>
                    <Input id="mpesa-consumer-secret" type="password" placeholder="Enter consumer secret" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mpesa-callback">Callback URL</Label>
                  <div className="flex">
                    <Input
                      id="mpesa-callback"
                      value="https://kimcompass.com/api/payments/mpesa/callback"
                      readOnly
                      className="rounded-r-none bg-muted"
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() =>
                        navigator.clipboard.writeText("https://kimcompass.com/api/payments/mpesa/callback")
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Use this URL in your M-Pesa developer portal.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="card" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="card-enabled">Enable Card Payments</Label>
                  <p className="text-sm text-muted-foreground">Allow payments via credit/debit cards.</p>
                </div>
                <Switch
                  id="card-enabled"
                  checked={enabledGateways.includes("card")}
                  onCheckedChange={() => toggleGateway("card")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-processor">Payment Processor</Label>
                <Select defaultValue="stripe">
                  <SelectTrigger id="card-processor">
                    <SelectValue placeholder="Select processor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="pesapal">PesaPal</SelectItem>
                    <SelectItem value="flutterwave">Flutterwave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex">
                      <Input
                        id="api-key"
                        type={showLiveKey ? "text" : "password"}
                        placeholder="Enter API key"
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        className="rounded-l-none border-l-0"
                        onClick={() => setShowLiveKey(!showLiveKey)}
                      >
                        {showLiveKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secret-key">Secret Key</Label>
                    <Input id="secret-key" type="password" placeholder="Enter secret key" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex">
                    <Input
                      id="webhook-url"
                      value="https://kimcompass.com/api/payments/stripe/webhook"
                      readOnly
                      className="rounded-r-none bg-muted"
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={() =>
                        navigator.clipboard.writeText("https://kimcompass.com/api/payments/stripe/webhook")
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Use this URL in your payment processor dashboard.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-cards" defaultChecked />
                    <Label htmlFor="save-cards">Allow users to save payment methods</Label>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Users can save their card details for future payments.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="bank-enabled">Enable Bank Transfers</Label>
                  <p className="text-sm text-muted-foreground">Allow payments via bank transfers.</p>
                </div>
                <Switch
                  id="bank-enabled"
                  checked={enabledGateways.includes("bank")}
                  onCheckedChange={() => toggleGateway("bank")}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" placeholder="e.g. Kenya Commercial Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" placeholder="Enter account number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Name</Label>
                    <Input id="account-name" placeholder="e.g. KimCompass Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-code">Branch Code</Label>
                    <Input id="branch-code" placeholder="Enter branch code" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-instructions">Payment Instructions</Label>
                  <textarea
                    id="bank-instructions"
                    className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent"
                    placeholder="Enter instructions for bank transfers"
                    defaultValue="Please include your order number in the payment reference. Your order will be processed once payment is confirmed."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="manual-verification" defaultChecked />
                    <Label htmlFor="manual-verification">Require manual verification</Label>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Bank transfers will require manual verification by an administrator.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure general payment settings and options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="default-currency">Default Currency</Label>
              <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                <SelectTrigger id="default-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                  <SelectItem value="UGX">Ugandan Shilling (UGX)</SelectItem>
                  <SelectItem value="TZS">Tanzanian Shilling (TZS)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-fee">Transaction Fee (%)</Label>
              <Input id="transaction-fee" type="number" defaultValue="2.5" min="0" max="100" step="0.1" />
              <p className="text-sm text-muted-foreground">
                Fee charged on each transaction. This can be passed to the customer or absorbed.
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Payment Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="partial-payments" />
                <Label htmlFor="partial-payments">Allow partial payments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="installment-payments" />
                <Label htmlFor="installment-payments">Allow installment payments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="refunds" defaultChecked />
                <Label htmlFor="refunds">Allow refunds</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="automatic-receipts" defaultChecked />
                <Label htmlFor="automatic-receipts">Send automatic receipts</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Payment Notifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="notify-success" defaultChecked />
                <Label htmlFor="notify-success">Notify on successful payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify-failed" defaultChecked />
                <Label htmlFor="notify-failed">Notify on failed payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify-refund" defaultChecked />
                <Label htmlFor="notify-refund">Notify on refund</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify-dispute" defaultChecked />
                <Label htmlFor="notify-dispute">Notify on payment dispute</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Settings</CardTitle>
          <CardDescription>Configure invoice generation and formatting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
              <Input id="invoice-prefix" placeholder="e.g. INV-" defaultValue="KCP-" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoice-start">Starting Invoice Number</Label>
              <Input id="invoice-start" type="number" defaultValue="1001" min="1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-details">Company Details</Label>
            <textarea
              id="company-details"
              className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent"
              placeholder="Enter company details for invoices"
              defaultValue="KimCompass Ltd
123 Kimathi Street
Nairobi, Kenya
PIN: P051234567Z
Tel: +254 700 123456"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
            <textarea
              id="invoice-notes"
              className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent"
              placeholder="Enter default notes to appear on invoices"
              defaultValue="Thank you for your business. Payment is due within 30 days."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice-logo">Invoice Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Invoice logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                Upload Logo
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-invoices">Automatic Invoices</Label>
              <p className="text-sm text-muted-foreground">Automatically generate invoices for all payments.</p>
            </div>
            <Switch id="auto-invoices" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Preview Invoice
          </Button>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
          <CardDescription>Configure tax rates and tax handling.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-tax">Enable Tax Calculation</Label>
              <p className="text-sm text-muted-foreground">Automatically calculate and add tax to invoices.</p>
            </div>
            <Switch id="enable-tax" defaultChecked />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tax-name">Tax Name</Label>
              <Input id="tax-name" placeholder="e.g. VAT" defaultValue="VAT" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" defaultValue="16" min="0" max="100" step="0.1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax-number">Tax Registration Number</Label>
            <Input id="tax-number" placeholder="e.g. VAT123456789" defaultValue="VAT20230001" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="prices-include-tax" />
            <Label htmlFor="prices-include-tax">Prices include tax</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="show-tax-breakdown" defaultChecked />
            <Label htmlFor="show-tax-breakdown">Show tax breakdown on invoices</Label>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
