//
//  ChunkConfig.swift
//  ngay26thang4
//
//  Created by LAP01567 on 25/05/2022.
//

import Foundation

@objc(ChunkConfig)
class ChunkConfig: NSObject {
  var chunkId:String = "Hello"
  var url: URL = URL(fileURLWithPath: "helllo")
  var timeout: NSNumber = 1000
  var method: String = "Example"
//  var headers: NSDictionary<String,String> = [:]
  var body: NSData = NSData()
}
