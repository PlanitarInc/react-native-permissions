#import <UIKit/UIKit.h>
#import "LocalNetworkPrivacy.h"

@interface LocalNetworkPrivacy () <NSNetServiceDelegate>

@property (nonatomic) NSNetService *service;
@property (nonatomic) void (^completion)(BOOL);
@property (nonatomic) NSTimer *timer;
@property (nonatomic) BOOL publishing;

@end

@implementation LocalNetworkPrivacy

static NSString * const kLocalNetworkPermissionRequestedKey = @"LocalNetworkPermissionRequested";

- (instancetype)init {
    if (self = [super init]) {
        self.service = [[NSNetService alloc] initWithDomain:@"local." type:@"_lnp._tcp." name:@"LocalNetworkPrivacy" port:1100];
    }
    return self;
}

- (void)dealloc {
    [self.service stop];
}

- (void)checkAccessState:(void (^)(BOOL))completion {
    self.completion = completion;

    BOOL permissionRequestedBefore = [[NSUserDefaults standardUserDefaults] boolForKey:kLocalNetworkPermissionRequestedKey];

    if (!permissionRequestedBefore) {
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:kLocalNetworkPermissionRequestedKey];

        self.publishing = YES;
        self.service.delegate = self;
        [self.service publish];

        self.timer = [NSTimer scheduledTimerWithTimeInterval:0.5 repeats:YES block:^(NSTimer * _Nonnull timer) {
            if (self.publishing) {
                NSLog(@"Local network permission status: Requesting");
            } else {
                [self completeWithResult:self.service.includesPeerToPeer];
            }
        }];
    } else {
        self.publishing = YES;
        self.service.delegate = self;
        [self.service publish];

        self.timer = [NSTimer scheduledTimerWithTimeInterval:2 repeats:NO block:^(NSTimer * _Nonnull timer) {
            [self completeWithResult:NO];
        }];
    }
}

#pragma mark - NSNetServiceDelegate

- (void)netServiceDidPublish:(NSNetService *)sender {
    self.publishing = NO;
    [self completeWithResult:YES];
}

- (void)netService:(NSNetService *)sender didNotPublish:(NSDictionary<NSString *,NSNumber *> *)errorDict {
    self.publishing = NO;
    [self completeWithResult:NO];
}

#pragma mark - Private Methods

- (void)completeWithResult:(BOOL)result {
    [self.timer invalidate];
    if (self.completion) {
        self.completion(result);
    }
}

@end

