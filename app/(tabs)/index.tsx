import Screen from "@/components/screen";
import { StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const date = new Date();
date.setUTCHours(0,0,0,0);

export default function Index(){
    return (
        <Screen>
            <Text style={styles.text}>Calendar Page</Text>
            <Calendar
                // Initially visible month. Default = now
                initialDate={'2012-03-01'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2012-05-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2012-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                }}

                // Do not show days of other months in month page. Default = false
                // hideExtraDays={true}

                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                // firstDay={1}

                // Hide day names. Default = false
                // hideDayNames={true}

                // Show week numbers to the left. Default = false
                // showWeekNumbers={true}

                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}

                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}

                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                // disableAllTouchEventsForDisabledDays={true}

                // Replace default month and year title with custom one. the function receive a date as parameter
                // renderHeader={date => {
                //     /*Return JSX*/
                // }}
                // Enable the option to swipe between months. Default = false
                // enableSwipeMonths={true}
                />
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 20,
    }
});