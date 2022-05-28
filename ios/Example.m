//
//  Example.m
//  ngay26thang4
//
//  Created by LAP01567 on 25/05/2022.
//



#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(ExampleNative, Example, NSObject)

RCT_EXTERN_METHOD(getChunkFilePath: (NSString)chunkId)
RCT_EXTERN_METHOD(goToMiniApp: (NSString)name withAppName:(NSString)appName)
RCT_EXTERN_METHOD(navigateInMiniApp: (NSString)name withAppName:(NSString)appName)

//RCT_EXPORT_METHOD(goToMiniApp:(NSString *)name appName:(NSString *)appName)
//RCT_EXTERN_METHOD(sendCallbackToNative: (RCTResponseSenderBlock)rnCallback)
//RCT_EXTERN_METHOD(goToSecondViewController: (nonnull NSNumber *)reactTag)
//RCT_EXTERN_METHOD(dismissViewController: (nonnull NSNumber *)reactTag)

@end
