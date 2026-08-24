import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { DAYS, MONTHS } from "react-native-calendar-ui";
import { eCalendarDay, event, useWeeklyView } from "./useWeekly";

export function WeeklyView() {
  const {
    year,
    month,
    days,
    selectedDate,
    selectDate,
    nextMonth,
    previousMonth,
    isToday,
    isDateSelected,
    addEvent,
    delEvent,
  } = useWeeklyView({
    onDateSelect: (date) => console.log("Selected:", date),
    onMonthChange: (year, month) => console.log("Month changed:", year, month),
  });

  const [showAdd, setshowAdd] = useState<boolean>(false);
  const [eventForm, seteventForm] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [info, setInfo] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  //returns mm/dd/yy
  const formatDate = (d: Date) =>
    `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
      .getDate()
      .toString()
      .padStart(2, "0")}/${d.getFullYear().toString().slice(-2)}`;

  //returns 0:00
  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  //Converts to string
  const getEventStr = (nEvent: event) =>
    `${nEvent.title}     (${formatTime(nEvent.startTime)} - ${formatTime(nEvent.endTime)})`;

  return (
    <View style={styles.container}>
      {/* Arrows + Month Label */}
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#BEC4C4" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {MONTHS[month]} {year}
        </Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Ionicons name="arrow-forward-outline" size={28} color="#BEC4C4" />
        </TouchableOpacity>
      </View>

      {/* Day FlatList */}
      <FlatList<eCalendarDay>
        style={[styles.list]}
        data={days}
        renderItem={({ item, index }) => {
          const date = new Date(item.year, item.month, item.date);
          const selected = isDateSelected(date);
          const today = isToday(date);

          return (
            <View style={[styles.row]}>
              <View style={[styles.dateLabel]}>
                <Text style={[styles.dayText]}>
                  {DAYS[date.getDay()].slice(0, 3)}
                </Text>
                <Text style={[styles.dateText]}>{item.date}</Text>
              </View>

              {/* Showing each event by itself */}
              <View style={[{ flex: 1 }]}>
                {item.events.length === 0 ? (
                  <TouchableOpacity
                    style={[
                      styles.day,
                      !item.isCurrentMonth && styles.dayOutside,
                      selected && styles.daySelected,
                    ]}
                    onPress={() => {
                      selectDate(date);
                    }}
                  ></TouchableOpacity>
                ) : (
                  item.events.map((nEvent) => (
                    <TouchableOpacity
                      style={[
                        styles.day,
                        !item.isCurrentMonth && styles.dayOutside,
                        selected && styles.daySelected,
                      ]}
                      key={nEvent.id}
                      onPress={() => {
                        selectDate(date);
                      }}
                    >
                      <Text
                        style={[
                          styles.eventText,
                          !item.isCurrentMonth && styles.dayTextOutside,
                          selected && styles.dayTextSelected,
                          today && styles.dayTextToday,
                        ]}
                      >
                        {getEventStr(nEvent)}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          );
        }}
      />

      {/* Add events btns */}
      <Pressable
        style={[styles.floatBtn]}
        onPress={() => {
          if (showAdd) {
            setshowAdd(false);
          } else {
            setshowAdd(true);
          }
        }}
      >
        <Ionicons name="add-outline" size={40} color="#BEC4C4" />
      </Pressable>
      {showAdd && (
        <Pressable
          style={[styles.addBtn]}
          onPress={() => {
            seteventForm(true);
          }}
        >
          <Text style={[styles.addTxt]}>Event</Text>
        </Pressable>
      )}

      {/* Event form */}
      <Modal
        visible={eventForm}
        onRequestClose={() => {
          seteventForm(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backdrop}>
            <View style={styles.sheet}>
              <Text style={[styles.header, { color: "#7a7a7a" }]}>
                Add Event
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
              />

              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.inputText}>{formatDate(date)}</Text>
              </TouchableOpacity>

              {showDatePicker &&
                (Platform.OS === "ios" ? (
                  <Modal
                    transparent
                    animationType="slide"
                    visible={showDatePicker}
                  >
                    <View style={styles.pickerBackdrop}>
                      <View style={styles.pickerSheet}>
                        <DateTimePicker
                          value={date}
                          mode="date"
                          display="spinner"
                          onChange={(event, selected) => {
                            if (selected) setDate(selected);
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => setShowDatePicker(false)}
                        >
                          <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selected) => {
                      setShowDatePicker(false);
                      if (selected) setDate(selected);
                    }}
                  />
                ))}

              <View style={[styles.row]}>
                <Text style={[{ marginRight: 95, color: "#7a7a7a" }]}>
                  Start Time
                </Text>
                <Text style={[{ color: "#7a7a7a" }]}>End Time</Text>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.input, styles.halfInput, { marginRight: 8 }]}
                  onPress={() => setShowStartPicker(true)}
                >
                  <Text style={styles.inputText}>{formatTime(startTime)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.input, styles.halfInput]}
                  onPress={() => setShowEndPicker(true)}
                >
                  <Text style={styles.inputText}>{formatTime(endTime)}</Text>
                </TouchableOpacity>
              </View>

              {showStartPicker &&
                (Platform.OS === "ios" ? (
                  <Modal
                    transparent
                    animationType="slide"
                    visible={showStartPicker}
                  >
                    <View style={styles.pickerBackdrop}>
                      <View style={styles.pickerSheet}>
                        <DateTimePicker
                          value={startTime}
                          mode="time"
                          display="spinner"
                          onChange={(event, selected) => {
                            if (selected) setStartTime(selected);
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => setShowStartPicker(false)}
                        >
                          <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    display="default"
                    onChange={(event, selected) => {
                      setShowStartPicker(false);
                      if (selected) setStartTime(selected);
                    }}
                  />
                ))}

              {showEndPicker &&
                (Platform.OS === "ios" ? (
                  <Modal
                    transparent
                    animationType="slide"
                    visible={showEndPicker}
                  >
                    <View style={styles.pickerBackdrop}>
                      <View style={styles.pickerSheet}>
                        <DateTimePicker
                          value={endTime}
                          mode="time"
                          display="spinner"
                          onChange={(event, selected) => {
                            if (selected) setEndTime(selected);
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => setShowEndPicker(false)}
                        >
                          <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    display="default"
                    onChange={(event, selected) => {
                      setShowEndPicker(false);
                      if (selected) setEndTime(selected);
                    }}
                  />
                ))}

              <TextInput
                style={[styles.input, styles.infoInput]}
                placeholder="Desc"
                placeholderTextColor="#888"
                value={info}
                onChangeText={setInfo}
                multiline
              />

              <View style={styles.formEnd}>
                <TouchableOpacity
                  style={[styles.addEBtn, { marginRight: 8 }]}
                  onPress={() => {
                    seteventForm(false);
                  }}
                >
                  <Text style={styles.addEBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addEBtn}
                  onPress={() => {
                    addEvent(info, title, startTime, endTime, date.getDate());
                    seteventForm(false);
                  }}
                >
                  <Text style={styles.addEBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 12,
    paddingBottom: 0,
  },
  list: { marginBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#BEC4C4" },
  navButton: { paddingTop: 12, paddingHorizontal: 50 },
  day: {
    backgroundColor: "#313333",
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
    marginBottom: 16,
    height: 60,
    borderTopWidth: 6,
    borderTopColor: "#97d73d8e",
  },
  dayOutside: { opacity: 0.3 },
  daySelected: { backgroundColor: "#3c3f3f" },
  eventText: { fontSize: 16, color: "#BEC4C4" },
  dayTextOutside: { color: "#999" },
  dayTextSelected: { color: "#fff", fontWeight: "bold" },
  dayTextToday: { fontWeight: "bold", textDecorationLine: "underline" },
  row: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  dateLabel: {
    backgroundColor: "#313333",
    borderRadius: 8,
    height: 50,
    marginTop: 6,
    marginLeft: 8,
    alignItems: "center",
    width: 45,
  },
  dayText: {
    color: "#9ee33ea5",
  },
  dateText: {
    color: "#BEC4C4",
    fontSize: 20,
  },
  floatBtn: {
    backgroundColor: "#3084cad7",
    position: "absolute",
    bottom: 100,
    right: 24,
    zIndex: 10,
    elevation: 10,
    borderRadius: 42,
  },
  addBtn: {
    backgroundColor: "#3084cad7",
    position: "absolute",
    bottom: 155,
    right: 5,
    zIndex: 10,
    elevation: 10,
    borderRadius: 8,
    width: 50,
    height: 25,
    alignItems: "center",
  },
  addTxt: {
    color: "#BEC4C4",
    fontSize: 17,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  sheet: {
    backgroundColor: "#1C1D1D",
    borderRadius: 20,
    padding: 20,
    width: "85%",
  },
  formHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#2A2B2B",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    justifyContent: "center",
    color: "#fff",
  },
  inputText: {
    color: "#fff",
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  infoInput: {
    height: 80,
    textAlignVertical: "top",
  },
  addEBtn: {
    backgroundColor: "#9ee33ea5",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
    flex: 1,
  },
  addEBtnText: {
    color: "#1C1D1D",
    fontWeight: "600",
  },
  formEnd: {
    flexDirection: "row",
  },
  pickerBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  pickerSheet: {
    backgroundColor: "#1C1D1D",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  doneText: {
    color: "#9ee33ea5",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
});
