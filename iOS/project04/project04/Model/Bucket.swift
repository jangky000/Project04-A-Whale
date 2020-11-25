//
//  Bucket.swift
//  project04
//
//  Created by jaejeon on 2020/11/23.
//

import Foundation

struct Bucket: Hashable {
    enum Section: String {
        case todo
        case done
    }
    
    let title: String
}