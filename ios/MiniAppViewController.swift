//
//  MiniAppViewController.swift
//  ngay26thang4
//
//  Created by LAP01567 on 25/05/2022.
//

import Foundation
import UIKit

@objc class MiniAppViewController: UIViewController {

    override func viewDidLoad() {
//      self.modalPresentationStyle = .overFullScreen
      self.navigationController?.isNavigationBarHidden = true
        super.viewDidLoad()
        print("MyViewController loaded...")
        // standard view controller will load from RN
    }

}
