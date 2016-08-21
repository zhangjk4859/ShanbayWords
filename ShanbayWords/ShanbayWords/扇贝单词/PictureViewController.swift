//
//  PictureViewController.swift
//  ShanbayWords
//
//  Created by 张俊凯 on 16/8/21.
//  Copyright © 2016年 张俊凯. All rights reserved.
//

import UIKit
import WebKit

class PictureViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let webView = WKWebView()
        webView.frame = CGRectMake(0, 0, view.frame.width, view.frame.height)
        view.addSubview(webView)
    }

    

}
