#!/bin/sh
kubectl delete pod,service,deployment mongodb
kubectl delete pod,service,deployment x-comm-api
kubectl delete pod,service,deployment x-comm-dashboard




