#import "RNPermissionHandlerLocalNetworkPrivacy.h"
#import "LocalNetworkPrivacy.h"

@implementation RNPermissionHandlerLocalNetworkPrivacy

+ (NSArray<NSString *> * _Nonnull)usageDescriptionKeys {
  return @[@"NSLocalNetworkUsageDescription"];
}

+ (NSString * _Nonnull)handlerUniqueId {
  return @"ios.permission.LOCAL_NETWORK_PRIVACY";
}

- (void)checkWithResolver:(void (^ _Nonnull)(RNPermissionStatus))resolve
                 rejecter:(void (__unused ^ _Nonnull)(NSError * _Nonnull))reject {
  if (![RNPermissionsHelper isFlaggedAsRequested:[[self class] handlerUniqueId]]) {
    return resolve(RNPermissionStatusNotDetermined);
  }

  [self requestWithResolver:resolve rejecter:reject];
}

- (void)requestWithResolver:(void (^ _Nonnull)(RNPermissionStatus))resolve
                   rejecter:(void (^ _Nonnull)(NSError * _Nonnull))reject {
  LocalNetworkPrivacy *local = [LocalNetworkPrivacy new];
  if (![RNPermissionsHelper isFlaggedAsRequested:[[self class] handlerUniqueId]]) {
      // This will trigger the local network permission native dialog
      [local checkAccessState:^(BOOL granted) {
          // Ignoring result for the first time. We just want iOS to initiate the permission request
      }];
      [RNPermissionsHelper flagAsRequested:[[self class] handlerUniqueId]];

      // We can't get the permission dialog result, therefor returning not determined status
      return resolve(RNPermissionStatusNotDetermined);
  }

  [local checkAccessState:^(BOOL granted) {
      resolve(granted ? RNPermissionStatusAuthorized : RNPermissionStatusDenied);
  }];
}

@end
