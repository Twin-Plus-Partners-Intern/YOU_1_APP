import React, { useState } from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Typography, Button, Input, FormField, Badge, TaskCard, ConflictBanner } from '@you-il/ui';

export default function Home() {
  // Demo states
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [task1Completed, setTask1Completed] = useState(false);
  const [task2Completed, setTask2Completed] = useState(true);
  const [task3Completed, setTask3Completed] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="mb-8 items-center border-b border-neutral-800 pb-6">
          <Typography
            variant="h1"
            className="text-secondary-500 text-center font-montserrat-bold mb-2"
          >
            DESIGN SYSTEM
          </Typography>
          <Typography variant="medium" className="text-neutral-300 text-center">
            YOU-IL AI Goal Manager Component Library
          </Typography>
        </View>

        {/* 1. Typography Section */}
        <View className="mb-10">
          <Typography
            variant="heading"
            className="text-secondary-500 mb-4 pb-1 border-b border-neutral-800"
          >
            I. Typography
          </Typography>
          <View className="gap-3 bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <Typography variant="h1">H1 Header - 40px</Typography>
            <Typography variant="h2">H2 Header - 36px</Typography>
            <Typography variant="h3">H3 Header - 32px</Typography>
            <Typography variant="h4">H4 Header - 28px</Typography>
            <Typography variant="heading">Heading - 24px</Typography>
            <Typography variant="large">Large Text - 20px</Typography>
            <Typography variant="medium">Medium Body - 16px</Typography>
            <Typography variant="small">Small Text - 14px</Typography>
            <Typography variant="extra-small">Extra Small Caption - 12px</Typography>

            <Typography variant="large" singleLine className="mt-2 text-neutral-400">
              Single-line test: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </View>
        </View>

        {/* 2. Color & Badge Section */}
        <View className="mb-10">
          <Typography
            variant="heading"
            className="text-secondary-500 mb-4 pb-1 border-b border-neutral-800"
          >
            II. Badges & Tags
          </Typography>
          <View className="gap-4 bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <Typography variant="medium" className="font-montserrat-bold text-neutral-300">
              Solid Badges (filled)
            </Typography>
            <View className="flex-row flex-wrap gap-2">
              <Badge label="Primary" color="primary" />
              <Badge label="Accent Green" color="secondary" />
              <Badge label="Success" color="success" />
              <Badge label="Warning" color="warning" />
              <Badge label="Error" color="error" />
              <Badge label="Info" color="info" />
              <Badge label="Neutral" color="neutral" />
            </View>

            <Typography variant="medium" className="font-montserrat-bold text-neutral-300 mt-2">
              Subtle Badges (tinted)
            </Typography>
            <View className="flex-row flex-wrap gap-2">
              <Badge label="Primary Subtle" color="primary" variant="subtle" />
              <Badge label="Pip-Boy Green" color="secondary" variant="subtle" />
              <Badge label="Success Subtle" color="success" variant="subtle" />
              <Badge label="Warning Subtle" color="warning" variant="subtle" />
              <Badge label="Error Subtle" color="error" variant="subtle" />
              <Badge label="Info Subtle" color="info" variant="subtle" />
              <Badge label="Neutral Subtle" color="neutral" variant="subtle" />
            </View>

            <Typography variant="medium" className="font-montserrat-bold text-neutral-300 mt-2">
              Outline Badges (bordered)
            </Typography>
            <View className="flex-row flex-wrap gap-2">
              <Badge label="Primary Border" color="primary" variant="outline" />
              <Badge label="Secondary Border" color="secondary" variant="outline" />
              <Badge label="Success Border" color="success" variant="outline" />
              <Badge label="Warning Border" color="warning" variant="outline" />
              <Badge label="Error Border" color="error" variant="outline" />
              <Badge label="Info Border" color="info" variant="outline" />
              <Badge label="Neutral Border" color="neutral" variant="outline" />
            </View>
          </View>
        </View>

        {/* 3. Button Section */}
        <View className="mb-10">
          <Typography
            variant="heading"
            className="text-secondary-500 mb-4 pb-1 border-b border-neutral-800"
          >
            III. Buttons
          </Typography>
          <View className="gap-5 bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <Typography variant="medium" className="font-montserrat-bold text-neutral-300">
              Capsule Variants
            </Typography>

            {/* Primary Button */}
            <Button
              label="Primary Accent White"
              variant="primary"
              leftIcon={<Feather name="navigation" size={16} color="#090D16" />}
              onPress={() => console.log('Pressed primary')}
            />

            {/* Secondary Button */}
            <Button
              label="Secondary Accent Green"
              variant="secondary"
              leftIcon={<Feather name="zap" size={16} color="#090D16" />}
              onPress={() => console.log('Pressed secondary')}
            />

            {/* Outline Button */}
            <Button
              label="Outline Bordered"
              variant="outline"
              leftIcon={<Feather name="plus" size={16} color="#FFFFFF" />}
              onPress={() => console.log('Pressed outline')}
            />

            {/* Subtle Button */}
            <Button
              label="Subtle Gray"
              variant="subtle"
              leftIcon={<Feather name="settings" size={16} color="#FFFFFF" />}
              onPress={() => console.log('Pressed subtle')}
            />

            <Typography variant="medium" className="font-montserrat-bold text-neutral-300 mt-2">
              States (Loading & Disabled)
            </Typography>
            <View className="flex-row gap-3">
              <Button label="Loading" variant="primary" loading className="flex-1" />
              <Button label="Disabled" variant="secondary" disabled className="flex-1" />
            </View>

            <Typography variant="medium" className="font-montserrat-bold text-neutral-300 mt-2">
              Circular Action Buttons
            </Typography>
            <View className="flex-row gap-4 items-center">
              <Button
                shape="circle"
                variant="primary"
                leftIcon={<Feather name="play" size={20} color="#090D16" />}
              />
              <Button
                shape="circle"
                variant="secondary"
                leftIcon={<Feather name="check" size={20} color="#090D16" />}
              />
              <Button
                shape="circle"
                variant="outline"
                leftIcon={<Feather name="plus" size={20} color="#FFFFFF" />}
              />
              <Button
                shape="circle"
                variant="subtle"
                leftIcon={<Feather name="more-horizontal" size={20} color="#FFFFFF" />}
              />
            </View>
          </View>
        </View>

        {/* 4. Input & FormField Section */}
        <View className="mb-10">
          <Typography
            variant="heading"
            className="text-secondary-500 mb-4 pb-1 border-b border-neutral-800"
          >
            IV. Inputs & Form Fields
          </Typography>
          <View className="gap-5 bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            {/* Standard Input with Left Icon */}
            <FormField
              label="Standard Email Input"
              placeholder="Enter your email"
              value={emailText}
              onChangeText={setEmailText}
              keyboardType="email-address"
              leftIcon={<Feather name="mail" size={18} color="#94A3B8" />}
            />

            {/* Password Input with eye toggle */}
            <FormField
              label="Password Input with Toggle"
              placeholder="Enter password"
              value={passwordText}
              onChangeText={setPasswordText}
              isPassword
              leftIcon={<Feather name="lock" size={18} color="#94A3B8" />}
            />

            {/* Warning State Field */}
            <FormField
              label="Form Field - Warning State"
              placeholder="Weak password length"
              warning="Password strength is weak"
              leftIcon={<Feather name="shield" size={18} color="#F59E0B" />}
            />

            {/* Error State Field */}
            <FormField
              label="Form Field - Error State"
              placeholder="Invalid email format"
              error="Please enter a valid email address (e.g. user@domain.com)"
              leftIcon={<Feather name="alert-circle" size={18} color="#EF4444" />}
            />
          </View>
        </View>

        {/* 5. TaskCard Section */}
        <View className="mb-10">
          <Typography
            variant="heading"
            className="text-secondary-500 mb-4 pb-1 border-b border-neutral-800"
          >
            V. Task Cards (Schedule & Checklist)
          </Typography>
          <View className="gap-4">
            {/* Dark Active Incomplete Card */}
            <TaskCard
              title="Pronoun & Article Practice"
              time="7:00 - 8:00 AM"
              category="Learning English"
              categoryColor="info"
              duration="1h"
              frequency="Everyweek"
              completed={task1Completed}
              onToggleComplete={setTask1Completed}
              theme="dark"
            />

            {/* Dark Active Complete Card */}
            <TaskCard
              title="Advanced Mathematics Exercises"
              time="9:30 - 11:00 AM"
              category="Math Class"
              categoryColor="warning"
              duration="1.5h"
              frequency="Everyweek"
              completed={task2Completed}
              onToggleComplete={setTask2Completed}
              theme="dark"
            />

            {/* Light Active Card Showcase */}
            <TaskCard
              title="UX/UI Design Review Session"
              time="2:00 - 3:30 PM"
              category="Self Development"
              categoryColor="secondary"
              duration="1.5h"
              frequency="Everyday"
              completed={task3Completed}
              onToggleComplete={setTask3Completed}
              theme="light"
            />

            {/* Draft Status Card */}
            <TaskCard
              title="Unscheduled Coding Routine draft"
              time="Flexible schedule"
              category="Developer Work"
              categoryColor="success"
              duration="2h"
              frequency="Monthly"
              status="draft"
              completed={false}
              theme="dark"
            />
          </View>
        </View>

        {/* 6. Feedback & Banners Section */}
        <View className="mb-10">
          <Typography
            variant="heading"
            className="text-secondary-500 mb-4 pb-1 border-b border-neutral-800"
          >
            VI. Feedback Banners
          </Typography>
          <View className="gap-4">
            {/* Schedule conflict alert */}
            <ConflictBanner
              title="Schedule Conflict Detected"
              description="This task overlaps with 'Advanced Mathematics' from 9:30 AM to 11:00 AM. Adjust time block caps."
              type="warning"
              onClose={() => console.log('Dismiss conflict warning')}
            />

            {/* Invalid Onboarding error */}
            <ConflictBanner
              title="Invalid Onboarding Configuration"
              description="Free-time caps cannot be set below 2 hours per day. Update your onboarding settings."
              type="error"
              actionLabel="Fix Settings"
              onAction={() => console.log('Redirecting user to settings...')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
