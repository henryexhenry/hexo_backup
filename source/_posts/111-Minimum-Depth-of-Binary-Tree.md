---
title: 111. Minimum Depth of Binary Tree
categories: leetcode
date: 2020-06-01 11:20:53
tags:
    - Recursion
    - BFS
---

## Problem

```text
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its minimum depth = 2.
```

## Solution

### Sol 1 recursion
<!-- Thinking -->
recursively find the smaller counting of child nodes.
if both children exist:

```text
    A
   / \
  L   R
```

minDepth of A should be 2 (take min)

if only one child exist:

```text
    B
   /
  L
```

minDepth of B should be 2 (take max)

<!-- Coding -->
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if root == None:
            return 0
        if root.left == None or root.right == None:
            return max(1+self.minDepth(root.left), 1+self.minDepth(root.right))
        else:
            return min(1+self.minDepth(root.left), 1+self.minDepth(root.right))
```

### Sol 2 BFS
<!-- Thinking -->
BFS should be faster in this problem.

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
    def minDepth(self, root: TreeNode) -> int:
        q = collections.deque([root])
        if root == None:
            return 0
        level = 0
        while q:
            level += 1
            for _ in range(len(q)):
                node = q.popleft()
                if node.left != None:
                    q.append(node.left)
                if node.right != None:
                    q.append(node.right)
                if node.left == None and node.right == None:
                    return level
```
