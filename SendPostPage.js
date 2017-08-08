import React, { Component } from "react";
import { addPost } from "./network";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#DCEDC8"
    },
    sendImage: {
        height: 35,
        width: 35,
        marginRight: 30
    },
    textInput: {
        backgroundColor: "#DCEDC8",
        color: "black",
        marginRight: 10,
        marginLeft: 10,
        textAlignVertical: "top",
        fontFamily: "IRAN_Sans",
        fontSize: 15,
        height: "100%"
    },
    headerRight: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    charLimit: {
        marginRight: 10,
        color: "#FFF",
        fontSize: 19
    },
    charLimitRed: {
        marginRight: 10,
        color: "red",
        fontSize: 19
    }
});
var charLimit = 160;

export default class SendPostPage extends Component {
    componentWillMount() {
        this.props.navigation.setParams({
            charLimit: 160
        });
    }
    static navigationOptions = props => {
        var limit = 160;
        if (props.navigation.state.params) {
            limit = props.navigation.state.params.charLimit;
        }
        return {
            title: "افزودن پست",
            headerStyle: {
                backgroundColor: "#8BC34A"
            },
            headerTitleStyle: {
                color: "#fff",
                fontFamily: "IRAN_Sans"
            },
            headerTintColor: "white",
            headerRight: (
                <View style={styles.headerRight}>
                    {limit >= 0 &&
                        <Text style={styles.charLimit}>
                            {" "}{limit}{" "}
                        </Text>}
                    {limit < 0 &&
                        <Text style={styles.charLimitRed}>
                            {" "}{limit}{" "}
                        </Text>}
                    {limit >= 0 &&
                        limit !== 160 &&
                        <TouchableOpacity
                            onPress={() => {
                                addPost(
                                    props.navigation.state.params.accessToken,
                                    props.navigation.state.params.refreshToken,
                                    props.navigation.state.params.location,
                                    props.navigation.state.params.text
                                );
                                props.navigation.goBack();
                            }}
                        >
                            <Image
                                style={styles.sendImage}
                                source={require("./sendEnable.png")}
                            />
                        </TouchableOpacity>}
                    {(limit < 0 || limit === 160) &&
                        <TouchableOpacity disabled={true}>
                            <Image
                                style={styles.sendImage}
                                source={require("./sendDisable.png")}
                            />
                        </TouchableOpacity>}
                </View>
            )
        };
    };
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    {...this.props}
                    editable={true}
                    multiline={true}
                    placeholder="جدید مدید چه خبر...؟!"
                    placeholderTextColor="#757575"
                    underlineColorAndroid="transparent"
                    numberOfLines={7}
                    onChangeText={text => {
                        this.setState({ text });
                        this.props.navigation.setParams({
                            charLimit: 160 - text.length,
                            text
                        });
                    }}
                />
            </View>
        );
    }
}
