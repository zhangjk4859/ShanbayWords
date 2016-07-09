//
//  JKBaseTabBarVC.swift
//  ShanbayWords
//
//  Created by 张俊凯 on 16/7/8.
//  Copyright © 2016年 张俊凯. All rights reserved.
//

import UIKit

class JKBaseTabBarVC: UITabBarController
{

    override func viewDidLoad()
    {
        super.viewDidLoad()
        setupChildViewController(JKWordsVC(), name: "扇贝单词", image: UIImage(named: "icon_home")!, selectedImage: UIImage(named: "icon_home")!)

        
    }

    //统一生成子控制器
    func setupChildViewController(vc:UIViewController!,name:String,image:UIImage,selectedImage:UIImage)
    {
        addChildViewController(vc)
        vc.tabBarItem.title = name
        vc.tabBarItem.image = image
        vc.tabBarItem.selectedImage = selectedImage
    }
    


}
