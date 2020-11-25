//
//  DetailRepository.swift
//  project04
//
//  Created by 남기범 on 2020/11/25.
//

import Foundation

class DetailRepository {
    var network: DetailAPIAgent
    var local: DetailLocalAgent
    
    init(network: DetailAPIAgent, local: DetailLocalAgent) {
        self.network = network
        self.local = local
    }
    
    func fetchDetailList(completion: @escaping ([DetailList]) -> Void) {
        network.request(from: DetailAPIAgent.RequestURL.fetch,
                        method: .GET,
                        body: nil, completion: { [weak self] result in
                            switch result {
                            case .success(_):
                                /*
                                 1. 추가된 경우
                                 2. 삭제된 경우
                                 3. 수정된 경우
                                 */
                                break
                            case .failure(_):
                                completion(self?.local.load() ?? [])
                            }
                        })
    }
    
    func appendDetailList(_ element: DetailList) {
        network.request(from: DetailAPIAgent.RequestURL.append,
                        method: .GET,
                        body: element,
                        completion: { result in
                            switch result {
                            case .success(_):
                                break
                            case .failure(_):
                                self.local.append(element)
                            }
                        })
    }
    
    func removeDetailList(at index: Int) {
        network.request(from: DetailAPIAgent.RequestURL.remove,
                        method: .GET,
                        body: nil,
                        completion: { result in
                            switch result {
                            case .success(_):
                                break
                            case .failure(_):
                                self.local.remove(at: index)
                            }
                        })
    }
    
    func reviseDetailList(at index: Int, element: DetailList) {
        network.request(from: DetailAPIAgent.RequestURL.revise,
                        method: .GET,
                        body: nil,
                        completion: { result in
                            switch result {
                            case .success(_):
                                break
                            case .failure(_):
                                self.local.revise(at: index, element: element)
                            }
                        })
    }
}
