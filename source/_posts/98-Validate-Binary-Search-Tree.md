---
title: 98. Validate Binary Search Tree
categories: leetcode
date: 2020-05-28 11:32:57
tags: 
    - BST
    - recusion
---

## Problem

```text
Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.


Example 1:

    2
   / \
  1   3

Input: [2,1,3]
Output: true
Example 2:

    5
   / \
  1   4
     / \
    3   6

Input: [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

## Solution

### Sol 1 recusive
<!-- Thinking -->
Acording to rule of BST, the current node must be larger than its left child and all of its offspring.

we can to pass the upper and lower boundary into a recursive function

<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        def helper(root, lower, upper):
            if root == None:
                return True
            if root.left != None :
                if root.left.val >= root.val or root.left.val <= lower:
                    return False
            if root.right != None:
                if root.right.val <= root.val or root.right.val >= upper:
                    return False
            return helper(root.left, lower, root.val) and helper(root.right, root.val, upper)
        return helper(root, float('-inf'), float('+inf'))
```

### Sol 2
<!-- Thinking -->
traverse the tree by inorder traverse, and check if the order is sorted.

<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        stack, last = [], float('-inf')
        while stack or root:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            if root.val <= last:
                return False
            last = root.val
            root = root.right
        return True
```
