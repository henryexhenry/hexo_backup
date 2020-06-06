---
title: 94. Binary Tree Inorder Traversal
categories: leetcode
date: 2020-06-06 23:16:30
tags:
    - DFS
    - Recursion
---

## Problem

```text
Given a binary tree, return the inorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]
Follow up: Recursive solution is trivial, could you do it iteratively?
```

## Solution

### Sol 1 Recursion
<!-- Thinking -->

<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        L = []
        def helper(root):
            if root == None:
                return
            helper(root.left)
            L.append(root.val)
            helper(root.right)
        helper(root)
        return L
```

### Sol 2 Iteration
<!-- Thinking -->

<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        L = []
        stack = []
        while stack or root:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            L.append(root.val)
            root = root.right
        return L
```
