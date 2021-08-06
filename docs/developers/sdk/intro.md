---
sidebar_position: 1
title: Introduction
---

# Introduction

This section describes how developers can integrate their applications with the ONCHAINID platform.

The **ONCHAINID ecosystem** comes with many tools and packages you can use to facilitate the integration of blockchain identities within your applications.

The **Identity SDK** is designed to help developers fetching information regarding identities and verify their claims. It's also the most designated tool to manage identity contracts such as keys and claims.

It is intended to support any identity compliant with the [ERC734](https://github.com/ethereum/eips/issues/734) and [ERC735](https://github.com/ethereum/EIPs/issues/735) standard, which are currently still working in progress. It will work especially well with the [contract implementations of the T-REX standard](https://github.com/TokenySolutions/T-REX).

# Core functionality

The core functionality of the identity SDK is as follows.

- Deploy identities
- List keys on an Identity.
- Manage keys on an Identity (if allowed).
- List Claims on an Identity.
- Manage Claims on an Identity (if allowed).
- Issue claims for an Identity (if allowed).
- Verify a claim (check validity).
