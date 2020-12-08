//
//  LoginAgent.swift
//  project04
//
//  Created by 남기범 on 2020/12/08.
//

import Foundation

class LoginAPIAgent {
    enum RequestURL {
        static let Login = "http://101.101.210.76:8000/api/users/login"
    }
    
    func request(from urlString: String,
                 method: HTTPMethod,
                 body: Data? = nil,
                 completion: @escaping (Result<Data, NetworkError>) -> Void) {
        guard let url = URL(string: urlString) else {
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        if let body = body {
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = body
        }
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if error != nil {
                completion(.failure(.responseError))
            }
            guard let response = response as? HTTPURLResponse,
                  (200...299).contains(response.statusCode),
                  let data = data else {
                completion(.failure(.responseError))
                return
            }
            
            completion(.success(data))
        }.resume()
    }
}