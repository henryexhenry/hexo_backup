---
title: 105. Construct Binary Tree from Preorder and Inorder Traversal
categories: leetcode
date: 2020-06-09 23:54:55
tags:
---

## Problem

```text
Given preorder and inorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.

For example, given

preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
Return the following binary tree:

    3
   / \
  9  20
    /  \
   15   7
```
<!-- more -->
## Solution

### Sol Recursion + 2 pointers
<!-- Thinking -->
preorder can tell us the root, and inorder can tell us the order of left right trees.
Using 2 pointers to set the size of sub-problem.
<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        return self.helper(preorder, 0, len(preorder)-1, inorder, 0, len(inorder)-1)

    def helper(self, preorder, preL, preR, inorder, inL, inR):
        if preL>preR or inL>inR:
            return None
        root_val = preorder[preL]
        root = TreeNode(root_val)
        pivot = inorder.index(root_val)

        root.left = self.helper(preorder, preL+1, preL+pivot-inL, inorder, inL, pivot-1)
        root.right = self.helper(preorder, preL+pivot-inL+1, preR, inorder, pivot+1, inR)

        return root
```
