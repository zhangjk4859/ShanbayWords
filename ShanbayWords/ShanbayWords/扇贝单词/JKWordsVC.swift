//
//  JKWordsVC.swift
//  ShanbayWords
//
//  Created by 张俊凯 on 16/7/10.
//  Copyright © 2016年 张俊凯. All rights reserved.
//

import UIKit

class JKWordsVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        tabBarItem.title = "扇贝单词"
        //view.backgroundColor = UIColor.redColor()
        
        //添加标题栏
        let titleView = UIView()
        titleView.frame = CGRect(x: 0, y: 64, width: view.frame.size.width, height:30)
        view.addSubview(titleView)
        titleView.backgroundColor = UIColor.purpleColor()
        
        //添加四个按钮
        
        let width = view.frame.size.width / 4
        for index in 0...3{
            let btn = UIButton()
            
            let btnX = index * width
            
            btn.frame = CGRect(x: btnX , y: 0, width: width, height: 30)
            
        }
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
