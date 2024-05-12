import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZegoSuperBoardManager } from "zego-superboard-web";

const MyIconButton = ({ icon }) => {
    // This component needs implementation based on Zego's button component
    // It should render an icon based on the provided `icon` prop and handle clicks
    return (
        <button onClick={
            ()=>{
                console.log('clicked')
            }
        }>
            {icon}
            
        </button>
    );
};

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

const RoomPage = () => {
    const roomId = getUrlParams().get('roomID') || randomID(5);

    const meeting = async (element) => {
        const appId = 24025880;
        const ServerSecret = 'f9ef30249d288eebc81c2064f6711278';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            ServerSecret,
            roomId,
            Date.now().toString(),
            ".."
        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);

        // Add ZegoSuperBoardManager plugin directly to ZegoUIKit instance
        zc.addPlugins({ ZegoSuperBoardManager });

        zc.joinRoom({
            maxUsers: 5,
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            videoResolutionList: [
                ZegoUIKitPrebuilt.VideoResolution_360P,
                ZegoUIKitPrebuilt.VideoResolution_180P,
                ZegoUIKitPrebuilt.VideoResolution_480P,
                ZegoUIKitPrebuilt.VideoResolution_720P,
            ],
            videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P,
            onUserAvatarSetter: (userList) => {
                userList.forEach(user => {
                    user.setUserAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6b4EOx7ysCVbhIujYl8R65V3FPa_GChmzUA&usqp=CAU")
                })
            },
            sharedLinks: [
                {
                    name: 'Copy link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' + roomId,
                },
            ],
            whiteboardConfig: {
                showAddImageButton: true,
            },
            showTurnOffRemoteCameraButton: true,
            showRemoveUserButton: true,
            showRoomTimer: true,
            enableUserSearch: true,
            showLeavingView: true,
            extendButtons: [
                {
                    name: "CustomButton",
                    component: <MyIconButton icon="edit" />
                }
            ],
        })
    };

    return (
        <div>
            <div ref={meeting} style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    );
};

export default RoomPage;
