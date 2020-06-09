---
title: 103. Binary Tree Zigzag Level Order Traversal
categories: leetcode
date: 2020-06-09 10:44:02
tags:
---

## Problem

```text
Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its zigzag level order traversal as:

[
  [3],
  [20,9],
  [15,7]
]
```
<!-- more -->
## Solution

### Sol 1
<!-- Thinking -->
Using BFS is quite easy to solve. Remember to reverse the order in the even line.

<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if root == None:
            return []
        ans = []
        q = [root]
        flag = 1
        while q:
            temp = []
            for _ in range(len(q)):
                node = q.pop()

                temp.append(node.val)
                if node.left != None:
                    q.insert(0,node.left)
                if node.right != None:
                    q.insert(0,node.right)
            if flag == 1:
                ans.append(temp)
            else:
                ans.append(temp[::-1])
            flag *= -1
        return ans
```
