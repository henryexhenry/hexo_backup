---
title: 107. Binary Tree Level Order Traversal II
categories: leetcode
date: 2020-06-03 23:53:46
tags:
---

## Problem

```
Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its bottom-up level order traversal as:

[
  [15,7],
  [9,20],
  [3]
]
```

## Solution

### Sol 1 BFS
<!-- Thinking -->


<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
import collections
class Solution:
    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        if root == None:
            return None
        q = collections.deque([root])
        ans = []
        while q:
            ans.insert(0,[])
            for _ in range(len(q)):
                node = q.popleft()
                ans[0].append(node.val)
                if node.left != None:
                    q.append(node.left)
                if node.right != None:
                    q.append(node.right)
        return ans
```
