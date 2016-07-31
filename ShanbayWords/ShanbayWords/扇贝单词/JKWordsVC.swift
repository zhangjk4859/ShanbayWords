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
        
        
//        //添加四个按钮
//        
//        let width = view.frame.size.width / 4
//        for index in 0...3{
//            let btn = UIButton()
//            
//            let btnX = index * width
//            
//            btn.frame = CGRect(x: btnX , y: 0, width: width, height: 30)
//            
//        }
        
        //设置tableView
        
        
        
        
        
    }
    
    
    //懒加载
    private lazy var titleView :UIView = {
        let titleView = UIView()
        titleView.frame = CGRect(x: 0, y: 64, width: UIScreen.mainScreen().bounds.size.width, height:30)
        titleView.backgroundColor = UIColor.purpleColor()
        return titleView
        }()


}
