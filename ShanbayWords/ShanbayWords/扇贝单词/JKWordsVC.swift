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
        let textField = UITextField()
        textField.frame = CGRectMake(0, CGRectGetMaxY(titleView.frame), 200, 30)
        view.addSubview(textField)
        textField.backgroundColor = UIColor.redColor()
        
        //增加一个查询按钮
        let searchBtn = UIButton(type: UIButtonType.System)
        searchBtn.frame = CGRectMake(0, CGRectGetMaxY(textField.frame), 200, 30)
        searchBtn.setTitle("查询图片", forState: UIControlState.Normal)
        searchBtn.addTarget(self, action:#selector(JKWordsVC.testAction) , forControlEvents: UIControlEvents.TouchUpInside)
        searchBtn.backgroundColor = UIColor.blueColor()
        view.addSubview(searchBtn)
        
        
        //webView展示图片
       
        
    }
    
   private func pushVC(textField:UITextField){
    
//        let pushVC = PictureViewController()
//        navigationController?.pushViewController(pushVC, animated: true)
        print("123")
    }
    func testAction(){
        print("testAction")
    }
    
    
    //懒加载
    private lazy var titleView :UIView = {
        let titleView = UIView()
        titleView.frame = CGRect(x: 0, y: 64, width: UIScreen.mainScreen().bounds.size.width, height:30)
        titleView.backgroundColor = UIColor.purpleColor()
        return titleView
        
    }()


}
