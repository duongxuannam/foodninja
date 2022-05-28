//
//  Example.swift
//  ngay26thang4
//
//  Created by LAP01567 on 25/05/2022.
//

import Foundation
import React
//
//@objc(RCTCxxBridge)
//class RCTCxxBridge:NSObject {
//    func executeApplicationScript(_ script: Data?, url: URL?, async: Bool) {
//    }
//}

@objc(Example)
class Example:NSObject {
  
  @objc
  func execute(
    _ bridge: RCTCxxBridge,
    chunkId: String?,
    url: URL?,
    withResolver resolve: RCTPromiseResolveBlock,
    withRejecter reject: RCTPromiseRejectBlock
  ) throws {
    let chunkPath = getChunkFilePath(chunkId!)
    do{
      let manager =  FileManager.default
//      let data = manager.contents(atPath: chunkPath!.path)
//      print("hello\(String(describing: data))")
//      bridge.executeApplicationScript(data, url: url, async: true)
      resolve(nil)
    }catch{
      reject("Loi", error.localizedDescription, nil)
    }
  }
  
  func getChunksDirectoryPath() -> String? {
    var rootDirectoryPath = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask).map(\.path).first
      rootDirectoryPath = URL(fileURLWithPath: rootDirectoryPath ?? "").appendingPathComponent(Bundle.main.bundleIdentifier ?? "").path
    print("DDDDDDDDDDDDDD ")
    print(rootDirectoryPath)
    print(URL(fileURLWithPath: rootDirectoryPath ?? "").appendingPathComponent("chunks").path)

      return URL(fileURLWithPath: rootDirectoryPath ?? "").appendingPathComponent("chunks").path
  }
  
  @objc
  func getChunkFilePath(_ chunkId: String?) -> String? {
    let chunkPath = URL(fileURLWithPath: getChunksDirectoryPath()!).appendingPathComponent(chunkId ?? "").path
    print("ikak kasd")
    return URL(fileURLWithPath: chunkPath).appendingPathExtension("chunk.bundle").path
//    return URL(fileURLWithPath: chunkPath).appendingPathExtension("chunk.bundle").path
  }
  
  @objc
  func downloadAndCache(
      _ config: ChunkConfig?,
      completionHandler callback: @escaping (_ error: Error?) -> Void
  ) {
    let chunkFilePath = getChunkFilePath(config?.chunkId)
    let chunksDirectoryPath = getChunksDirectoryPath()
    let request = NSMutableURLRequest(url: config!.url)
    request.httpMethod = (config?.method.uppercased())!
    request.timeoutInterval = TimeInterval(config!.timeout.doubleValue)
//
//    for key in config!.headers {
//      let value = config!.headers[key] as? String
//        if let value = value {
//            request.setValue(value, forHTTPHeaderField: key)
//        }
//    }
    
    if request.httpMethod == "POST" {
      request.httpBody = config?.body as Data?
    }
    if request.httpBody != nil && request.value(forHTTPHeaderField: "content-type") == nil {
        request.setValue("text/plain", forHTTPHeaderField: "content-type")
    }
    
    
    let task = URLSession.shared.dataTask(
      with: request as URLRequest) { data, response, error in
            if let error = error {
                callback(error)
            } else {
              self.createChunksDirectory(chunksDirectoryPath!)
              do {
//                try data!.write(to: chunkFilePath!, options: .atomic)
               } catch {
               }
              callback(nil)

            }
        }
    task.resume()
  }
  
  @objc
  func createChunksDirectory(_ chunksDirectoryPath: String){
    let manager = FileManager.default
    
    if !manager.fileExists(atPath: chunksDirectoryPath) {
        do {
            try manager.createDirectory(
                atPath: chunksDirectoryPath,
                withIntermediateDirectories: true,
                attributes: nil)
        } catch {
          print("error create Chunk Directory")
        }
    }
  }
  
  @objc func goToMiniApp(_ name: String,withAppName appName: String) -> Void {
    DispatchQueue.main.async {

      if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
          // call function in app delegate or seft handle
//        appDelegate.goToMiniApp()
        
        let vc:MiniAppViewController = MiniAppViewController()
        print(name)
        
        let rootView: RCTRootView = RCTRootView(
            bundleURL: Bundle.main.url(forResource: name, withExtension: "jsbundle")!,
//          bundleURL:URL(string: "http://localhost:8081/index.bundle?platform=ios")!,
            moduleName: appName,
            initialProperties: ["message_from_native": name])

        vc.view = rootView
        vc.modalPresentationStyle = .overFullScreen
        let controller = appDelegate.window.rootViewController
        let navigationController:UINavigationController = UINavigationController(rootViewController: vc)
        navigationController.setToolbarHidden(true, animated: false)
        controller?.present(navigationController, animated: true,completion: nil)
      }
    }
  }
  
  @objc func navigateInMiniApp(_ name: String,withAppName appName: String) -> Void {
    DispatchQueue.main.async {
      var presentViewController = UIApplication.shared.keyWindow?.rootViewController
     
      while let pVC = presentViewController?.presentedViewController
      {
          presentViewController = pVC
      }

      let vc:MiniAppViewController = MiniAppViewController()
      
      let rootView: RCTRootView = RCTRootView(
          bundleURL: Bundle.main.url(forResource: name, withExtension: "jsbundle")!,
//          bundleURL:URL(string: "http://localhost:8081/index.bundle?platform=ios")!,
          moduleName: appName,
          initialProperties: ["message_from_native": name])

      vc.view = rootView
      vc.modalPresentationStyle = .overFullScreen
      let navigationController:UINavigationController = UINavigationController(rootViewController: vc)
      navigationController.setToolbarHidden(true, animated: false)
      presentViewController!.present(navigationController, animated: true,completion: nil)

    }
  }
}

