"use client";

import Navbar from "@/components/navbar.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  dob: z.date().optional(),
  gender: z.string().optional(),
});

const addressFormSchema = z.object({
  addressLine1: z.string().min(5, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  useSameForBilling: z.boolean().default(true),
});

const passwordFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type AddressFormValues = z.infer<typeof addressFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const genders = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Non-binary", value: "non-binary" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    phone: "+1 (555) 123-4567",
    dob: new Date("1990-05-10"),
    gender: "female",
    memberSince: "May 2023",
    address: {
      addressLine1: "123 Fashion Street",
      addressLine2: "Apt 4S",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
  };

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullname: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
    },
  });

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      addressLine1: user.address.addressLine1,
      addressLine2: user.address.addressLine2,
      city: user.address.city,
      state: user.address.state,
      postalCode: user.address.postalCode,
      country: user.address.country,
      useSameForBilling: true,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    // Simulate API call
    setTimeout(() => {
      console.log(data);
    }, 1500);
  }

  function onAddressSubmit(data: AddressFormValues) {
    // Simulate API call
    setTimeout(() => {
      console.log(data);
    }, 1500);
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      passwordForm.reset();
    }, 1500);
  }

  function toggleBillingAddress(checked: boolean) {
    setShowBillingAddress(!checked);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground mb-1">
                    {user.email}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    Member since {user.memberSince}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="md:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Personal Information
                    </h3>
                    <Form {...profileForm}>
                      <form
                        onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={profileForm.control}
                          name="fullname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fullname</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                    >
                                      {field.value ? (
                                        format(field.value, "PP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Gender</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={`w-full justify-between ${!field.value && "text-muted-foreground"}`}
                                    >
                                      {field.value
                                        ? genders.find(
                                            (gender) =>
                                              gender.value === field.value,
                                          )?.label
                                        : "Select gender"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search gender..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No gender found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {genders.map((gender) => (
                                          <CommandItem
                                            value={gender.label}
                                            key={gender.value}
                                            onSelect={() => {
                                              profileForm.setValue(
                                                "gender",
                                                gender.value,
                                              );
                                            }}
                                          >
                                            <Check
                                              className={`mr-2 h-4 w-4 ${
                                                gender.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              }`}
                                            />
                                            {gender.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </Form>

                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">Password</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Change your password to keep your account secure.
                      </p>

                      <Form {...passwordForm}>
                        <form
                          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={passwordForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end">
                            <Button type="submit" variant="outline">
                              Change
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Shipping Address
                    </h3>

                    <Form {...addressForm}>
                      <form
                        onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={addressForm.control}
                          name="addressLine1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 1</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Fashion Street"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addressForm.control}
                          name="addressLine2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 2 (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Apt 4S" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={addressForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <FormControl>
                                  <Input placeholder="NY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={addressForm.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className={"w-full"}>
                                      <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {countries.map((country) => (
                                      <SelectItem key={country} value={country}>
                                        {country}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-6 border-t pt-6">
                          <h3 className="text-lg font-semibold mb-4">
                            Billing Address
                          </h3>

                          <FormField
                            control={addressForm.control}
                            name="useSameForBilling"
                            render={({ field }) => (
                              <div className="flex items-center space-x-2 mb-6">
                                <Checkbox
                                  id="useSameForBilling"
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    toggleBillingAddress(checked as boolean);
                                  }}
                                />
                                <label
                                  htmlFor="useSameForBilling"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Use the same address for billing and shipping
                                </label>
                              </div>
                            )}
                          />

                          {showBillingAddress ? (
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2"
                              onClick={() => setShowBillingAddress(false)}
                            >
                              <Plus className="h-4 w-4" /> Add Billing Address
                            </Button>
                          ) : (
                            <div className="space-y-4 border p-4 rounded-md">
                              <h4 className="font-medium">
                                Billing Address Details
                              </h4>
                              {/* Billing address form fields would go here */}
                              <p className="text-sm text-muted-foreground">
                                For this demo, we're just showing the billing
                                address section toggle.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end mt-6">
                          <Button type="submit">Save Address</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <label
                          htmlFor="marketing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Receive marketing emails
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" defaultChecked />
                        <label
                          htmlFor="newsletter"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Subscribe to newsletter
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sms" />
                        <label
                          htmlFor="sms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Receive SMS notifications
                        </label>
                      </div>

                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-medium mb-2">
                          Language Preference
                        </h4>
                        <Select defaultValue="english">
                          <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-medium mb-2">Currency</h4>
                        <Select defaultValue="usd">
                          <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                            <SelectItem value="cad">CAD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
