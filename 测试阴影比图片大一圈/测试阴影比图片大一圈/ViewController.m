//
//  ViewController.m
//  测试阴影比图片大一圈
//
//  Created by 张俊凯 on 16/7/11.
//  Copyright © 2016年 张俊凯. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIView *view = [UIView new];
    view.backgroundColor = [UIColor redColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    [self.view addSubview:view];
    
    CALayer *layer = [CALayer layer];
   // layer.contents = (__bridge id _Nullable)([UIImage imageNamed:@""].CGImage);
    
   layer.shadowPath =  [UIBezierPath bezierPathWithRect:CGRectMake(0, 0, 150, 150)].CGPath;
    layer.shadowColor = [UIColor blackColor].CGColor;
    [view.layer addSublayer:layer];
    
}


@end
