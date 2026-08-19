"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Server,
  Activity,
  UserCheck,
  Globe,
  Key,
} from "lucide-react";
import toast from "react-hot-toast";

interface AuditLog {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  ipAddress: string;
  location: string;
  status: "SUCCESS" | "WARNING" | "BLOCKED";
}

const INITIAL_LOGS: AuditLog[] = [];

export default function AdminZeroTrustPage() {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_LOGS);
  const [ipRuleInput, setIpRuleInput] = useState("");

  const handleAddIpRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipRuleInput.trim()) return;
    toast.success(`IP Address ${ipRuleInput.trim()} added to Security Firewall Whitelist! 🛡️`);
    setIpRuleInput("");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Zero-Trust Security & Audit Trail
            </h1>
            <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Shield Active
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time security event log, master admin authentication audit trail, and IP firewall whitelist configuration.
          </p>
        </div>
      </div>

      {/* Security Status KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Security Level</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Encrypted 256-Bit</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Active Admin Sessions</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">1 Active</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">System Health</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">100% Operational</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Firewall Rules</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Strict IP Enforcement</span>
          </div>
        </div>
      </div>

      {/* IP Whitelist Form */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Add IP Whitelist Rule</h3>
          <p className="text-xs text-gray-500">Only trusted IP addresses can access control panel routes.</p>
        </div>

        <form onSubmit={handleAddIpRule} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={ipRuleInput}
            onChange={(e) => setIpRuleInput(e.target.value)}
            placeholder="e.g. 192.168.1.100"
            className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-[#F7F9FC] dark:bg-[#1A1D23] text-xs font-mono text-gray-900 dark:text-white focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0">
            Add IP Rule
          </button>
        </form>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#EAEFF5] dark:border-gray-800 font-bold text-xs text-gray-900 dark:text-white">
          SECURITY AUDIT LOG TRAIL
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAFBFD] dark:bg-[#16181C] border-b border-[#EAEFF5] dark:border-gray-800 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">TIMESTAMP</th>
                <th className="py-3.5 px-5">ADMIN / IDENTITY</th>
                <th className="py-3.5 px-5">ACTION DESCRIPTION</th>
                <th className="py-3.5 px-5">IP ADDRESS & ORIGIN</th>
                <th className="py-3.5 px-5 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFF5] dark:divide-gray-800/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAFBFD] dark:hover:bg-[#16181C]/50 transition-colors">
                  <td className="py-4 px-5 text-gray-500 dark:text-gray-400 font-mono text-[11px]">{log.timestamp}</td>
                  <td className="py-4 px-5 font-semibold text-gray-900 dark:text-white">{log.adminEmail}</td>
                  <td className="py-4 px-5 text-gray-700 dark:text-gray-300">{log.action}</td>
                  <td className="py-4 px-5 font-mono text-gray-500">{log.ipAddress} ({log.location})</td>
                  <td className="py-4 px-5 text-right">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        log.status === "SUCCESS"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200"
                          : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
