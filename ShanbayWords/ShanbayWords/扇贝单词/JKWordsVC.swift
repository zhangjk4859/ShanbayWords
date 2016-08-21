//
//  JKWordsVC.swift
//  ShanbayWords
//
//  Created by 张俊凯 on 16/7/10.
//  Copyright © 2016年 张俊凯. All rights reserved.
//

import UIKit

class JKWordsVC: UIViewController {

    override func viewDidLoad()
    {
        super.viewDidLoad()
        tabBarItem.title = "扇贝单词"
        
        //添加标题栏
        view.addSubview(titleView)
        //增加一个textField
        
        //增加一个查询按钮
        
        //webView展示图片
        
        
        
        
        
        
        
    }
    
    
    //懒加载
    private lazy var titleView :UIView = {
        let titleView = UIView()
        titleView.frame = CGRect(x: 0, y: 64, width: UIScreen.mainScreen().bounds.size.width, height:30)
        titleView.backgroundColor = UIColor.purpleColor()
        return titleView
        
    }()


}
