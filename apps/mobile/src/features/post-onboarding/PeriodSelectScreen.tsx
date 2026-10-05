import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { FlameStepper } from './components/FlameStepper';

interface PeriodSelectScreenProps {
  initialStartDate?: string; // ISO string: "2026-04-01"
  initialEndDate?: string; // ISO string: "2026-04-30"
  onBack: () => void;
  onContinue: (startDate: string, endDate: string) => void;
}

export const PeriodSelectScreen: React.FC<PeriodSelectScreenProps> = ({
  initialStartDate = '2026-04-01',
  initialEndDate = '2026-04-30',
  onBack,
  onContinue,
}) => {
  // Current displayed month: April 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(3); // 0-indexed: 3 = April

  // Range selection state (day of April)
  const [startDay, setStartDay] = useState<number>(1);
  const [endDay, setEndDay] = useState<number>(30);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleDayPress = (dayNum: number) => {
    if (startDay === null || (startDay !== null && endDay !== null)) {
      setStartDay(dayNum);
      setEndDay(dayNum);
    } else if (dayNum < startDay) {
      setStartDay(dayNum);
    } else {
      setEndDay(dayNum);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const m = pad(currentMonth + 1);
    const startIso = `${currentYear}-${m}-${pad(startDay)}`;
    const endIso = `${currentYear}-${m}-${pad(endDay)}`;
    onContinue(startIso, endIso);
  };

  // Generate days for April 2026 calendar view
  // Monday to Sunday column structure as per screenshot 2
  // Row 1: 31 (March), 1, 2, 3, 4, 5, 6
  // Row 2: 7, 8, 9, 10, 11, 12, 13
  // Row 3: 14, 15, 16, 17, 18, 19, 20
  // Row 4: 21, 22, 23, 24, 25, 26, 27
  // Row 5: 28, 29, 30, 31 (May 1), 1, 2, 3
  const calendarRows = [
    [
      { day: 31, isCurrentMonth: false },
      { day: 1, isCurrentMonth: true },
      { day: 2, isCurrentMonth: true },
      { day: 3, isCurrentMonth: true },
      { day: 4, isCurrentMonth: true },
      { day: 5, isCurrentMonth: true },
      { day: 6, isCurrentMonth: true },
    ],
    [
      { day: 7, isCurrentMonth: true },
      { day: 8, isCurrentMonth: true },
      { day: 9, isCurrentMonth: true },
      { day: 10, isCurrentMonth: true },
      { day: 11, isCurrentMonth: true },
      { day: 12, isCurrentMonth: true },
      { day: 13, isCurrentMonth: true },
    ],
    [
      { day: 14, isCurrentMonth: true },
      { day: 15, isCurrentMonth: true },
      { day: 16, isCurrentMonth: true },
      { day: 17, isCurrentMonth: true },
      { day: 18, isCurrentMonth: true },
      { day: 19, isCurrentMonth: true },
      { day: 20, isCurrentMonth: true },
    ],
    [
      { day: 21, isCurrentMonth: true },
      { day: 22, isCurrentMonth: true },
      { day: 23, isCurrentMonth: true },
      { day: 24, isCurrentMonth: true },
      { day: 25, isCurrentMonth: true },
      { day: 26, isCurrentMonth: true },
      { day: 27, isCurrentMonth: true },
    ],
    [
      { day: 28, isCurrentMonth: true },
      { day: 29, isCurrentMonth: true },
      { day: 30, isCurrentMonth: true },
      { day: 31, isCurrentMonth: true },
      { day: 1, isCurrentMonth: false },
      { day: 2, isCurrentMonth: false },
      { day: 3, isCurrentMonth: false },
    ],
  ];

  return (
    <View className="flex-1 bg-neutral-1000">
      <SafeAreaView className="flex-1 px-4">
        {/* Header Flame Stepper (Step 2 of 4) */}
        <View className="pt-2">
          <FlameStepper currentStep={2} totalSteps={4} />
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 24,
            paddingTop: 8,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Title & Subtitle */}
            <View className="items-center mt-2">
              <Text className="text-white font-montserrat-bold text-3xl text-center">
                Select the period
              </Text>
              <Text className="text-neutral-400 font-montserrat-medium text-sm text-center mt-2 px-4 leading-5">
                Select the period you want to achieve your goal.
              </Text>
            </View>

            {/* Month Selector Bar */}
            <View className="flex-row items-center justify-between px-4 mt-8">
              <TouchableOpacity activeOpacity={0.7} onPress={handlePrevMonth} className="p-2">
                <ChevronLeft size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <Text className="text-white font-montserrat-bold text-lg">
                {monthNames[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleNextMonth} className="p-2">
                <ChevronRight size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Days of Week Row (M T W T F S S) */}
            <View className="flex-row justify-between px-2 mt-6 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <View key={idx} className="w-11 items-center justify-center">
                  <Text className="text-neutral-400 font-montserrat-medium text-xs">{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid Rows */}
            <View className="gap-2 px-1">
              {calendarRows.map((row, rIdx) => (
                <View key={rIdx} className="flex-row justify-between">
                  {row.map((item, cIdx) => {
                    const isDayInCurrentMonth = item.isCurrentMonth;
                    const dayVal = item.day;

                    // Range selection logic
                    const isStart = isDayInCurrentMonth && dayVal === startDay;
                    const isEnd = isDayInCurrentMonth && dayVal === endDay;
                    const isInRange =
                      isDayInCurrentMonth &&
                      startDay !== null &&
                      endDay !== null &&
                      dayVal >= startDay &&
                      dayVal <= endDay;

                    // Style variants based on selection
                    let cellStyle = 'w-11 h-14 rounded-full items-center justify-center';
                    let textStyle = 'font-montserrat-medium text-base text-white';

                    if (isStart || isEnd) {
                      cellStyle += ' bg-white shadow-lg';
                      textStyle = 'font-montserrat-bold text-base text-black';
                    } else if (isInRange) {
                      cellStyle += ' bg-neutral-300';
                      textStyle = 'font-montserrat-bold text-base text-black';
                    } else if (!isDayInCurrentMonth) {
                      textStyle = 'font-montserrat text-base text-neutral-600';
                    }

                    return (
                      <TouchableOpacity
                        key={cIdx}
                        activeOpacity={0.8}
                        disabled={!isDayInCurrentMonth}
                        onPress={() => handleDayPress(dayVal)}
                        className={cellStyle}
                      >
                        <Text className={textStyle}>{dayVal}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Navigation Buttons Bar */}
          <View className="flex-row gap-4 mt-8 mb-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onBack}
              className="flex-1 border border-neutral-600 bg-transparent rounded-full py-4 items-center justify-center"
            >
              <Text className="text-white font-montserrat-semibold text-base">Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleContinue}
              className="flex-1 bg-white rounded-full py-4 items-center justify-center"
            >
              <Text className="text-black font-montserrat-semibold text-base">Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PeriodSelectScreen;
